package com.lunafashion.order;

import com.lunafashion.cart.Cart;
import com.lunafashion.cart.CartItem;
import com.lunafashion.cart.CartRepository;
import com.lunafashion.common.enums.OrderStatus;
import com.lunafashion.common.enums.PaymentStatus;
import com.lunafashion.common.enums.ProductStatus;
import com.lunafashion.common.exception.BadRequestException;
import com.lunafashion.common.exception.ResourceNotFoundException;
import com.lunafashion.common.exception.UnauthorizedException;
import com.lunafashion.order.dto.CreateOrderRequest;
import com.lunafashion.order.dto.OrderItemResponse;
import com.lunafashion.order.dto.OrderResponse;
import com.lunafashion.order.dto.OrderStatusUpdateRequest;
import com.lunafashion.product.Product;
import com.lunafashion.product.ProductImage;
import com.lunafashion.product.ProductImageRepository;
import com.lunafashion.product.ProductRepository;
import com.lunafashion.product.ProductVariant;
import com.lunafashion.product.ProductVariantRepository;
import com.lunafashion.user.User;
import com.lunafashion.user.UserRepository;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderService {

  private static final BigDecimal ZERO = BigDecimal.ZERO;
  private static final String COD = "COD";

  private final OrderRepository orderRepository;
  private final CartRepository cartRepository;
  private final ProductRepository productRepository;
  private final ProductVariantRepository productVariantRepository;
  private final ProductImageRepository productImageRepository;
  private final UserRepository userRepository;

  public OrderService(
      OrderRepository orderRepository,
      CartRepository cartRepository,
      ProductRepository productRepository,
      ProductVariantRepository productVariantRepository,
      ProductImageRepository productImageRepository,
      UserRepository userRepository
  ) {
    this.orderRepository = orderRepository;
    this.cartRepository = cartRepository;
    this.productRepository = productRepository;
    this.productVariantRepository = productVariantRepository;
    this.productImageRepository = productImageRepository;
    this.userRepository = userRepository;
  }

  @Transactional
  public OrderResponse createOrder(CreateOrderRequest request) {
    User user = getCurrentUser();
    validatePaymentMethod(request.paymentMethod());

    Cart cart = cartRepository.findByUserId(user.getId())
        .orElseThrow(() -> new BadRequestException("Cart is empty"));
    if (cart.getItems().isEmpty()) {
      throw new BadRequestException("Cart is empty");
    }

    Order order = Order.builder()
        .code(generateOrderCode())
        .user(user)
        .receiverName(request.receiverName().trim())
        .receiverPhone(request.receiverPhone().trim())
        .shippingAddress(request.receiverAddress().trim())
        .subtotal(ZERO)
        .shippingFee(ZERO)
        .discount(ZERO)
        .total(ZERO)
        .paymentMethod(COD)
        .paymentStatus(PaymentStatus.UNPAID)
        .status(OrderStatus.PENDING)
        .note(trimToNull(request.note()))
        .build();

    BigDecimal subtotal = ZERO;
    for (CartItem cartItem : cart.getItems()) {
      Product product = productRepository.findById(cartItem.getProduct().getId())
          .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
      ProductVariant variant = productVariantRepository.findById(cartItem.getVariant().getId())
          .orElseThrow(() -> new ResourceNotFoundException("Product variant not found"));

      validateProductCanOrder(product);
      validateVariantBelongsToProduct(variant, product);
      validateStock(variant, cartItem.getQuantity());

      BigDecimal unitPrice = resolveUnitPrice(product, variant);
      BigDecimal lineTotal = unitPrice.multiply(BigDecimal.valueOf(cartItem.getQuantity()));
      String thumbnailUrl = getThumbnailUrl(product.getId());

      OrderItem item = OrderItem.builder()
          .order(order)
          .product(product)
          .variant(variant)
          .productName(product.getName())
          .productSlug(product.getSlug())
          .imageUrl(thumbnailUrl)
          .size(variant.getSize())
          .color(variant.getColor())
          .sku(variant.getSku())
          .quantity(cartItem.getQuantity())
          .unitPrice(unitPrice)
          .lineTotal(lineTotal)
          .build();
      order.getItems().add(item);
      subtotal = subtotal.add(lineTotal);

      variant.setStock(variant.getStock() - cartItem.getQuantity());
      productVariantRepository.save(variant);
    }

    order.setSubtotal(subtotal);
    order.setTotal(subtotal.add(order.getShippingFee()).subtract(order.getDiscount()));
    Order savedOrder = orderRepository.save(order);

    cart.getItems().clear();
    return toOrderResponse(savedOrder);
  }

  @Transactional(readOnly = true)
  public Page<OrderResponse> getCurrentUserOrders(Pageable pageable) {
    User user = getCurrentUser();
    return orderRepository.findAll(userOrders(user.getId()), pageable)
        .map(this::toOrderResponse);
  }

  @Transactional(readOnly = true)
  public OrderResponse getCurrentUserOrder(Long id) {
    User user = getCurrentUser();
    Order order = orderRepository.findByIdAndUserId(id, user.getId())
        .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
    return toOrderResponse(order);
  }

  @Transactional
  public OrderResponse cancelCurrentUserOrder(Long id) {
    User user = getCurrentUser();
    Order order = orderRepository.findByIdAndUserId(id, user.getId())
        .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

    if (order.getStatus() != OrderStatus.PENDING) {
      throw new BadRequestException("Only pending orders can be cancelled");
    }

    restoreStock(order);
    order.setStatus(OrderStatus.CANCELLED);
    return toOrderResponse(orderRepository.save(order));
  }

  @Transactional(readOnly = true)
  public Page<OrderResponse> getAdminOrders(
      String keyword,
      OrderStatus status,
      LocalDate fromDate,
      LocalDate toDate,
      Pageable pageable
  ) {
    Specification<Order> specification = Specification.where(hasKeyword(keyword))
        .and(hasStatus(status))
        .and(fromDate(fromDate))
        .and(toDate(toDate));

    return orderRepository.findAll(specification, pageable)
        .map(this::toOrderResponse);
  }

  @Transactional(readOnly = true)
  public OrderResponse getAdminOrder(Long id) {
    Order order = orderRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
    return toOrderResponse(order);
  }

  @Transactional
  public OrderResponse updateAdminOrderStatus(Long id, OrderStatusUpdateRequest request) {
    Order order = orderRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
    OrderStatus nextStatus = parseStatus(request.status());
    OrderStatus currentStatus = order.getStatus();

    if (currentStatus == nextStatus) {
      return toOrderResponse(order);
    }
    if (!isValidTransition(currentStatus, nextStatus)) {
      throw new BadRequestException("Invalid order status transition");
    }

    if (nextStatus == OrderStatus.CANCELLED) {
      restoreStock(order);
    }

    order.setStatus(nextStatus);
    return toOrderResponse(orderRepository.save(order));
  }

  public OrderStatus parseStatus(String status) {
    if (status == null || status.trim().isEmpty()) {
      return null;
    }

    try {
      return OrderStatus.valueOf(status.trim().toUpperCase(Locale.ROOT));
    } catch (IllegalArgumentException exception) {
      throw new BadRequestException("Invalid order status: " + status);
    }
  }

  private User getCurrentUser() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication == null || !authentication.isAuthenticated()) {
      throw new UnauthorizedException("Unauthorized");
    }

    return userRepository.findByEmail(authentication.getName())
        .orElseThrow(() -> new ResourceNotFoundException("User not found"));
  }

  private void validatePaymentMethod(String paymentMethod) {
    if (paymentMethod == null || !COD.equalsIgnoreCase(paymentMethod.trim())) {
      throw new BadRequestException("Only COD payment method is supported");
    }
  }

  private void validateProductCanOrder(Product product) {
    if (product.getStatus() == ProductStatus.HIDDEN
        || product.getStatus() == ProductStatus.STOPPED
        || product.getStatus() == ProductStatus.OUT_OF_STOCK) {
      throw new BadRequestException("Product is not available");
    }
  }

  private void validateVariantBelongsToProduct(ProductVariant variant, Product product) {
    if (!variant.getProduct().getId().equals(product.getId())) {
      throw new BadRequestException("Product variant does not belong to product");
    }
  }

  private void validateStock(ProductVariant variant, Integer quantity) {
    if (quantity == null || quantity <= 0) {
      throw new BadRequestException("Quantity must be greater than 0");
    }
    if (variant.getStock() == null || quantity > variant.getStock()) {
      throw new BadRequestException("Quantity exceeds available stock");
    }
  }

  private BigDecimal resolveUnitPrice(Product product, ProductVariant variant) {
    if (variant.getPrice() != null) {
      return variant.getPrice();
    }
    return product.getPrice();
  }

  private String generateOrderCode() {
    return "NS" + System.currentTimeMillis() + UUID.randomUUID().toString().substring(0, 6).toUpperCase(Locale.ROOT);
  }

  private void restoreStock(Order order) {
    for (OrderItem item : order.getItems()) {
      ProductVariant variant = item.getVariant();
      if (variant != null) {
        variant.setStock(variant.getStock() + item.getQuantity());
        productVariantRepository.save(variant);
      }
    }
  }

  private boolean isValidTransition(OrderStatus currentStatus, OrderStatus nextStatus) {
    return switch (currentStatus) {
      case PENDING -> nextStatus == OrderStatus.CONFIRMED || nextStatus == OrderStatus.CANCELLED;
      case CONFIRMED -> nextStatus == OrderStatus.SHIPPING || nextStatus == OrderStatus.CANCELLED;
      case SHIPPING -> nextStatus == OrderStatus.COMPLETED || nextStatus == OrderStatus.CANCELLED;
      case COMPLETED, CANCELLED -> false;
    };
  }

  private OrderResponse toOrderResponse(Order order) {
    List<OrderItemResponse> items = order.getItems().stream()
        .sorted(Comparator.comparing(OrderItem::getId, Comparator.nullsLast(Long::compareTo)))
        .map(this::toOrderItemResponse)
        .toList();
    int totalQuantity = items.stream().mapToInt(OrderItemResponse::quantity).sum();

    return new OrderResponse(
        order.getId(),
        order.getCode(),
        order.getUser() == null ? null : order.getUser().getId(),
        order.getUser() == null ? null : order.getUser().getEmail(),
        order.getReceiverName(),
        order.getReceiverPhone(),
        order.getShippingAddress(),
        order.getNote(),
        order.getPaymentMethod(),
        order.getStatus(),
        items,
        totalQuantity,
        order.getTotal(),
        order.getCreatedAt(),
        order.getUpdatedAt()
    );
  }

  private OrderItemResponse toOrderItemResponse(OrderItem item) {
    Long productId = item.getProduct() == null ? null : item.getProduct().getId();
    Long variantId = item.getVariant() == null ? null : item.getVariant().getId();

    return new OrderItemResponse(
        item.getId(),
        productId,
        item.getProductName(),
        item.getProductSlug(),
        item.getImageUrl(),
        variantId,
        item.getSize(),
        item.getColor(),
        item.getSku(),
        item.getUnitPrice(),
        item.getQuantity(),
        item.getLineTotal()
    );
  }

  private String getThumbnailUrl(Long productId) {
    return productImageRepository.findFirstByProductIdAndThumbnailTrue(productId)
        .or(() -> productImageRepository.findByProductIdOrderBySortOrderAsc(productId)
            .stream()
            .min(Comparator.comparing(ProductImage::getSortOrder)))
        .map(ProductImage::getImageUrl)
        .orElse(null);
  }

  private String trimToNull(String value) {
    if (value == null || value.trim().isEmpty()) {
      return null;
    }
    return value.trim();
  }

  private Specification<Order> userOrders(Long userId) {
    return (root, query, builder) -> builder.equal(root.get("user").get("id"), userId);
  }

  private Specification<Order> hasKeyword(String keyword) {
    return (root, query, builder) -> {
      if (keyword == null || keyword.trim().isEmpty()) {
        return builder.conjunction();
      }
      String pattern = "%" + keyword.trim().toLowerCase(Locale.ROOT) + "%";
      Join<Order, User> userJoin = root.join("user", JoinType.LEFT);
      return builder.or(
          builder.like(builder.lower(root.get("code")), pattern),
          builder.like(builder.lower(root.get("receiverName")), pattern),
          builder.like(builder.lower(root.get("receiverPhone")), pattern),
          builder.like(builder.lower(userJoin.get("email")), pattern)
      );
    };
  }

  private Specification<Order> hasStatus(OrderStatus status) {
    return (root, query, builder) -> status == null
        ? builder.conjunction()
        : builder.equal(root.get("status"), status);
  }

  private Specification<Order> fromDate(LocalDate fromDate) {
    return (root, query, builder) -> fromDate == null
        ? builder.conjunction()
        : builder.greaterThanOrEqualTo(root.get("createdAt"), fromDate.atStartOfDay().toInstant(ZoneOffset.UTC));
  }

  private Specification<Order> toDate(LocalDate toDate) {
    return (root, query, builder) -> toDate == null
        ? builder.conjunction()
        : builder.lessThan(root.get("createdAt"), toDate.plusDays(1).atStartOfDay().toInstant(ZoneOffset.UTC));
  }
}
