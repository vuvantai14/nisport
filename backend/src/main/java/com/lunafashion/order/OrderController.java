package com.lunafashion.order;

import com.lunafashion.common.ApiResponse;
import com.lunafashion.order.dto.CreateOrderRequest;
import com.lunafashion.order.dto.OrderResponse;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {

  private final OrderService orderService;

  public OrderController(OrderService orderService) {
    this.orderService = orderService;
  }

  @PostMapping
  public ApiResponse<OrderResponse> createOrder(@Valid @RequestBody CreateOrderRequest request) {
    return ApiResponse.success("Order created successfully", orderService.createOrder(request));
  }

  @GetMapping
  public ApiResponse<Page<OrderResponse>> getOrders(Pageable pageable) {
    return ApiResponse.success("Orders retrieved successfully", orderService.getCurrentUserOrders(pageable));
  }

  @GetMapping("/{id}")
  public ApiResponse<OrderResponse> getOrder(@PathVariable Long id) {
    return ApiResponse.success("Order retrieved successfully", orderService.getCurrentUserOrder(id));
  }

  @PatchMapping("/{id}/cancel")
  public ApiResponse<OrderResponse> cancelOrder(@PathVariable Long id) {
    return ApiResponse.success("Order cancelled successfully", orderService.cancelCurrentUserOrder(id));
  }
}
