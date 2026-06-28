package com.lunafashion.cart.dto;

import java.math.BigDecimal;

public record CartItemResponse(
    Long id,
    Long productId,
    String productName,
    String productSlug,
    String thumbnailUrl,
    Long variantId,
    String size,
    String color,
    String sku,
    BigDecimal price,
    Integer quantity,
    BigDecimal subtotal
) {
}
