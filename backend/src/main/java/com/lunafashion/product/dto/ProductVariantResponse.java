package com.lunafashion.product.dto;

import java.math.BigDecimal;

public record ProductVariantResponse(
    Long id,
    String size,
    String color,
    Integer stock,
    String sku,
    BigDecimal price
) {
}
