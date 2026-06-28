package com.lunafashion.cart.dto;

import java.math.BigDecimal;
import java.util.List;

public record CartResponse(
    Long id,
    Long userId,
    List<CartItemResponse> items,
    Integer totalQuantity,
    BigDecimal totalAmount
) {
}
