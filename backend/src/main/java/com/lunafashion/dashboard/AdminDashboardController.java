package com.lunafashion.dashboard;

import com.lunafashion.common.ApiResponse;
import com.lunafashion.dashboard.dto.DashboardSummaryResponse;
import com.lunafashion.dashboard.dto.OrderStatusStatResponse;
import com.lunafashion.dashboard.dto.RecentOrderResponse;
import com.lunafashion.dashboard.dto.RevenueStatResponse;
import com.lunafashion.dashboard.dto.TopProductResponse;
import java.time.LocalDate;
import java.util.List;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin/dashboard")
@PreAuthorize("hasRole('ADMIN')")
public class AdminDashboardController {

  private final AdminDashboardService adminDashboardService;

  public AdminDashboardController(AdminDashboardService adminDashboardService) {
    this.adminDashboardService = adminDashboardService;
  }

  @GetMapping("/summary")
  public ApiResponse<DashboardSummaryResponse> getSummary() {
    return ApiResponse.success("Dashboard summary retrieved successfully", adminDashboardService.getSummary());
  }

  @GetMapping("/revenue")
  public ApiResponse<List<RevenueStatResponse>> getRevenue(
      @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fromDate,
      @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate toDate,
      @RequestParam(required = false) String groupBy
  ) {
    return ApiResponse.success(
        "Dashboard revenue retrieved successfully",
        adminDashboardService.getRevenue(fromDate, toDate, groupBy)
    );
  }

  @GetMapping("/orders")
  public ApiResponse<List<OrderStatusStatResponse>> getOrderStats() {
    return ApiResponse.success("Dashboard order stats retrieved successfully", adminDashboardService.getOrderStats());
  }

  @GetMapping("/top-products")
  public ApiResponse<List<TopProductResponse>> getTopProducts(@RequestParam(required = false) Integer limit) {
    return ApiResponse.success(
        "Dashboard top products retrieved successfully",
        adminDashboardService.getTopProducts(limit)
    );
  }

  @GetMapping("/recent-orders")
  public ApiResponse<List<RecentOrderResponse>> getRecentOrders(@RequestParam(required = false) Integer limit) {
    return ApiResponse.success(
        "Dashboard recent orders retrieved successfully",
        adminDashboardService.getRecentOrders(limit)
    );
  }
}
