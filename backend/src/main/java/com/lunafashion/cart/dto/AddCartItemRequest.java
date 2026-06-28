package com.lunafashion.cart.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record AddCartItemRequest(
    @NotNull Long productId,
    @NotNull Long variantId,
    @NotNull @Positive Integer quantity
) {
}
