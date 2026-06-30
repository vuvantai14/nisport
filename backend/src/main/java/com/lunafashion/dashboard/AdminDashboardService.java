package com.lunafashion.dashboard;

import com.lunafashion.category.CategoryRepository;
import com.lunafashion.common.enums.OrderStatus;
import com.lunafashion.common.exception.BadRequestException;
import com.lunafashion.dashboard.dto.DashboardSummaryResponse;
import com.lunafashion.dashboard.dto.OrderStatusStatResponse;
import com.lunafashion.dashboard.dto.RecentOrderResponse;
import com.lunafashion.dashboard.dto.RevenueStatResponse;
import com.lunafashion.dashboard.dto.TopProductResponse;
import com.lunafashion.order.Order;
import com.lunafashion.order.OrderItemRepository;
import com.lunafashion.order.OrderRepository;
import com.lunafashion.product.ProductRepository;
import com.lunafashion.user.UserRepository;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class AdminDashboardService {

  private static final int LOW_STOCK_THRESHOLD = 10;
  private static final int DEFAULT_TOP_PRODUCT_LIMIT = 5;
  private static final int DEFAULT_RECENT_ORDER_LIMIT = 10;
  private static final int MAX_LIMIT = 50;
  private static final ZoneId DASHBOARD_ZONE = ZoneId.systemDefault();

  private final UserRepository userRepository;
  private final ProductRepository productRepository;
  private final CategoryRepository categoryRepository;
  private final OrderRepository orderRepository;
  private final OrderItemRepository orderItemRepository;

  public AdminDashboardService(
      UserRepository userRepository,
      ProductRepository productRepository,
      CategoryRepository categoryRepository,
      OrderRepository orderRepository,
      OrderItemRepository orderItemRepository
  ) {
    this.userRepository = userRepository;
    this.productRepository = productRepository;
    this.categoryRepository = categoryRepository;
    this.orderRepository = orderRepository;
    this.orderItemRepository = orderItemRepository;
  }

  public DashboardSummaryResponse getSummary() {
    LocalDate today = LocalDate.now(DASHBOARD_ZONE);
    LocalDate firstDayOfMonth = today.withDayOfMonth(1);

    return new DashboardSummaryResponse(
        userRepository.count(),
        productRepository.count(),
        categoryRepository.count(),
        orderRepository.count(),
        orderRepository.countByStatus(OrderStatus.PENDING),
        orderRepository.countByStatus(OrderStatus.COMPLETED),
        orderRepository.countByStatus(OrderStatus.CANCELLED),
        defaultMoney(orderRepository.sumTotalByStatus(OrderStatus.COMPLETED)),
        defaultMoney(orderRepository.sumTotalByStatusAndCreatedAtRange(
            OrderStatus.COMPLETED,
            startOfDay(today),
            startOfDay(today.plusDays(1))
        )),
        defaultMoney(orderRepository.sumTotalByStatusAndCreatedAtRange(
            OrderStatus.COMPLETED,
            startOfDay(firstDayOfMonth),
            startOfDay(firstDayOfMonth.plusMonths(1))
        )),
        productRepository.countLowStockProducts(LOW_STOCK_THRESHOLD)
    );
  }

  public List<RevenueStatResponse> getRevenue(LocalDate fromDate, LocalDate toDate, String groupBy) {
    RevenueGroup group = RevenueGroup.parse(groupBy);
    LocalDate effectiveTo = toDate == null ? LocalDate.now(DASHBOARD_ZONE) : toDate;
    LocalDate effectiveFrom = fromDate == null ? defaultFromDate(effectiveTo, group) : fromDate;
    if (effectiveFrom.isAfter(effectiveTo)) {
      throw new BadRequestException("fromDate must be before or equal to toDate");
    }

    Map<String, RevenueAccumulator> stats = initializeRevenueBuckets(effectiveFrom, effectiveTo, group);
    List<Order> completedOrders = orderRepository.findByStatusAndCreatedAtBetween(
        OrderStatus.COMPLETED,
        startOfDay(effectiveFrom),
        startOfDay(effectiveTo.plusDays(1))
    );

    completedOrders.forEach(order -> {
      String label = toRevenueLabel(order.getCreatedAt(), group);
      RevenueAccumulator accumulator = stats.get(label);
      if (accumulator != null) {
        accumulator.add(order.getTotal());
      }
    });

    return stats.entrySet().stream()
        .map(entry -> new RevenueStatResponse(
            entry.getKey(),
            entry.getValue().totalOrders(),
            entry.getValue().totalRevenue()
        ))
        .toList();
  }

  public List<OrderStatusStatResponse> getOrderStats() {
    return List.of(
        new OrderStatusStatResponse(OrderStatus.PENDING, orderRepository.countByStatus(OrderStatus.PENDING)),
        new OrderStatusStatResponse(OrderStatus.CONFIRMED, orderRepository.countByStatus(OrderStatus.CONFIRMED)),
        new OrderStatusStatResponse(OrderStatus.SHIPPING, orderRepository.countByStatus(OrderStatus.SHIPPING)),
        new OrderStatusStatResponse(OrderStatus.COMPLETED, orderRepository.countByStatus(OrderStatus.COMPLETED)),
        new OrderStatusStatResponse(OrderStatus.CANCELLED, orderRepository.countByStatus(OrderStatus.CANCELLED))
    );
  }

  public List<TopProductResponse> getTopProducts(Integer limit) {
    int safeLimit = normalizeLimit(limit, DEFAULT_TOP_PRODUCT_LIMIT);
    return orderItemRepository.findTopProductsByOrderStatus(
            OrderStatus.COMPLETED,
            PageRequest.of(0, safeLimit)
        )
        .stream()
        .map(this::toTopProductResponse)
        .toList();
  }

  public List<RecentOrderResponse> getRecentOrders(Integer limit) {
    int safeLimit = normalizeLimit(limit, DEFAULT_RECENT_ORDER_LIMIT);
    return orderRepository.findAll(PageRequest.of(0, safeLimit, Sort.by(Sort.Direction.DESC, "createdAt")))
        .stream()
        .map(this::toRecentOrderResponse)
        .toList();
  }

  private TopProductResponse toTopProductResponse(Object[] row) {
    return new TopProductResponse(
        toLong(row[0]),
        (String) row[1],
        (String) row[2],
        (String) row[3],
        toLong(row[4]),
        defaultMoney((BigDecimal) row[5])
    );
  }

  private RecentOrderResponse toRecentOrderResponse(Order order) {
    return new RecentOrderResponse(
        order.getId(),
        order.getCode(),
        order.getUser() == null ? null : order.getUser().getEmail(),
        order.getReceiverName(),
        order.getReceiverPhone(),
        order.getStatus(),
        order.getTotal(),
        order.getCreatedAt()
    );
  }

  private Map<String, RevenueAccumulator> initializeRevenueBuckets(
      LocalDate fromDate,
      LocalDate toDate,
      RevenueGroup group
  ) {
    Map<String, RevenueAccumulator> stats = new LinkedHashMap<>();
    if (group == RevenueGroup.DAY) {
      long days = ChronoUnit.DAYS.between(fromDate, toDate);
      for (long index = 0; index <= days; index++) {
        stats.put(fromDate.plusDays(index).toString(), new RevenueAccumulator());
      }
      return stats;
    }

    YearMonth start = YearMonth.from(fromDate);
    YearMonth end = YearMonth.from(toDate);
    List<YearMonth> months = new ArrayList<>();
    YearMonth current = start;
    while (!current.isAfter(end)) {
      months.add(current);
      current = current.plusMonths(1);
    }
    months.forEach(month -> stats.put(month.toString(), new RevenueAccumulator()));
    return stats;
  }

  private String toRevenueLabel(Instant createdAt, RevenueGroup group) {
    LocalDate date = createdAt.atZone(DASHBOARD_ZONE).toLocalDate();
    if (group == RevenueGroup.MONTH) {
      return YearMonth.from(date).toString();
    }
    return date.toString();
  }

  private LocalDate defaultFromDate(LocalDate toDate, RevenueGroup group) {
    if (group == RevenueGroup.MONTH) {
      return toDate.withDayOfYear(1);
    }
    return toDate.minusDays(29);
  }

  private Instant startOfDay(LocalDate date) {
    return date.atStartOfDay(DASHBOARD_ZONE).toInstant();
  }

  private BigDecimal defaultMoney(BigDecimal value) {
    return value == null ? BigDecimal.ZERO : value;
  }

  private int normalizeLimit(Integer limit, int defaultLimit) {
    if (limit == null) {
      return defaultLimit;
    }
    if (limit <= 0) {
      throw new BadRequestException("limit must be greater than 0");
    }
    return Math.min(limit, MAX_LIMIT);
  }

  private Long toLong(Object value) {
    if (value == null) {
      return null;
    }
    return ((Number) value).longValue();
  }

  private enum RevenueGroup {
    DAY,
    MONTH;

    static RevenueGroup parse(String value) {
      if (value == null || value.trim().isEmpty()) {
        return DAY;
      }
      try {
        return RevenueGroup.valueOf(value.trim().toUpperCase());
      } catch (IllegalArgumentException exception) {
        throw new BadRequestException("groupBy must be DAY or MONTH");
      }
    }
  }

  private static class RevenueAccumulator {
    private long totalOrders;
    private BigDecimal totalRevenue = BigDecimal.ZERO;

    void add(BigDecimal amount) {
      totalOrders++;
      totalRevenue = totalRevenue.add(amount == null ? BigDecimal.ZERO : amount);
    }

    Long totalOrders() {
      return totalOrders;
    }

    BigDecimal totalRevenue() {
      return totalRevenue;
    }
  }
}
