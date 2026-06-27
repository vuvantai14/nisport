package com.lunafashion.admin.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import java.math.BigDecimal;

public record ProductVariantRequest(
    @NotBlank(message = "Size is required")
    String size,
    @NotBlank(message = "Color is required")
    String color,
    @Min(value = 0, message = "Stock must not be negative")
    Integer stock,
    @NotBlank(message = "SKU is required")
    String sku,
    @Min(value = 0, message = "Variant price must not be negative")
    BigDecimal price
) {
}
