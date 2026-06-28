package com.lunafashion.admin;

import com.lunafashion.common.ApiResponse;
import com.lunafashion.common.enums.OrderStatus;
import com.lunafashion.order.OrderService;
import com.lunafashion.order.dto.OrderResponse;
import com.lunafashion.order.dto.OrderStatusUpdateRequest;
import jakarta.validation.Valid;
import java.time.LocalDate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin/orders")
@PreAuthorize("hasRole('ADMIN')")
public class AdminOrderController {

  private final OrderService orderService;

  public AdminOrderController(OrderService orderService) {
    this.orderService = orderService;
  }

  @GetMapping
  public ApiResponse<Page<OrderResponse>> getOrders(
      @RequestParam(required = false) String keyword,
      @RequestParam(required = false) String status,
      @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fromDate,
      @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate toDate,
      Pageable pageable
  ) {
    OrderStatus parsedStatus = orderService.parseStatus(status);
    return ApiResponse.success(
        "Admin orders retrieved successfully",
        orderService.getAdminOrders(keyword, parsedStatus, fromDate, toDate, pageable)
    );
  }

  @GetMapping("/{id}")
  public ApiResponse<OrderResponse> getOrder(@PathVariable Long id) {
    return ApiResponse.success("Admin order retrieved successfully", orderService.getAdminOrder(id));
  }

  @PatchMapping("/{id}/status")
  public ApiResponse<OrderResponse> updateStatus(
      @PathVariable Long id,
      @Valid @RequestBody OrderStatusUpdateRequest request
  ) {
    return ApiResponse.success("Order status updated successfully", orderService.updateAdminOrderStatus(id, request));
  }
}
