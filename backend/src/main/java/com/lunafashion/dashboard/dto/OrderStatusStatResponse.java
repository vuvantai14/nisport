package com.lunafashion.dashboard.dto;

import com.lunafashion.common.enums.OrderStatus;

public record OrderStatusStatResponse(
    OrderStatus status,
    Long count
) {
}
