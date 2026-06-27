package com.lunafashion.admin.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.List;

public record ProductCreateRequest(
    @NotBlank(message = "Product name is required")
    String name,
    String slug,
    String description,
    @NotNull(message = "Category ID is required")
    Long categoryId,
    @NotBlank(message = "Gender is required")
    String gender,
    @NotNull(message = "Price is required")
    @Min(value = 0, message = "Price must not be negative")
    BigDecimal price,
    @Min(value = 0, message = "Old price must not be negative")
    BigDecimal oldPrice,
    String tag,
    String status,
    @Valid
    List<ProductImageRequest> images,
    @Valid
    List<ProductVariantRequest> variants
) {
}
