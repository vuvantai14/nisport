package com.lunafashion.dashboard.dto;

import java.math.BigDecimal;

public record RevenueStatResponse(
    String label,
    Long totalOrders,
    BigDecimal totalRevenue
) {
}
