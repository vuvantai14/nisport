package com.lunafashion.product.dto;

import com.lunafashion.category.dto.CategoryResponse;
import com.lunafashion.common.enums.Gender;
import com.lunafashion.common.enums.ProductStatus;
import com.lunafashion.common.enums.ProductTag;
import java.math.BigDecimal;
import java.util.List;

public record ProductDetailResponse(
    Long id,
    String name,
    String slug,
    CategoryResponse category,
    Gender gender,
    BigDecimal price,
    BigDecimal oldPrice,
    String description,
    ProductTag tag,
    ProductStatus status,
    List<ProductImageResponse> images,
    List<ProductVariantResponse> variants,
    Integer totalStock
) {
}
