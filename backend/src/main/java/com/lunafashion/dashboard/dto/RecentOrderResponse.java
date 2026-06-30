package com.lunafashion.dashboard.dto;

import com.lunafashion.common.enums.OrderStatus;
import java.math.BigDecimal;
import java.time.Instant;

public record RecentOrderResponse(
    Long id,
    String orderCode,
    String userEmail,
    String receiverName,
    String receiverPhone,
    OrderStatus status,
    BigDecimal totalAmount,
    Instant createdAt
) {
}
