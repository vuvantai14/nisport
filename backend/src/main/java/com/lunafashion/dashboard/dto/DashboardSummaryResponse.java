package com.lunafashion.dashboard.dto;

import java.math.BigDecimal;

public record DashboardSummaryResponse(
    Long totalUsers,
    Long totalProducts,
    Long totalCategories,
    Long totalOrders,
    Long pendingOrders,
    Long completedOrders,
    Long cancelledOrders,
    BigDecimal totalRevenue,
    BigDecimal todayRevenue,
    BigDecimal monthRevenue,
    Long lowStockProducts
) {
}
