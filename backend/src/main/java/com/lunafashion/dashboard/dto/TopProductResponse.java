package com.lunafashion.dashboard.dto;

import java.math.BigDecimal;

public record TopProductResponse(
    Long productId,
    String productName,
    String productSlug,
    String thumbnailUrl,
    Long totalQuantitySold,
    BigDecimal totalRevenue
) {
}
