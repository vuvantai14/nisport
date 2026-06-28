package com.lunafashion.order.dto;

import com.lunafashion.common.enums.OrderStatus;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public record OrderResponse(
    Long id,
    String orderCode,
    Long userId,
    String userEmail,
    String receiverName,
    String receiverPhone,
    String receiverAddress,
    String note,
    String paymentMethod,
    OrderStatus status,
    List<OrderItemResponse> items,
    Integer totalQuantity,
    BigDecimal totalAmount,
    Instant createdAt,
    Instant updatedAt
) {
}
