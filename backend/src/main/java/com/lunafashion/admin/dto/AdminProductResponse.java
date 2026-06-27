package com.lunafashion.admin.dto;

import com.lunafashion.common.enums.Gender;
import com.lunafashion.common.enums.ProductStatus;
import com.lunafashion.common.enums.ProductTag;
import com.lunafashion.product.dto.ProductImageResponse;
import com.lunafashion.product.dto.ProductVariantResponse;
import java.math.BigDecimal;
import java.util.List;

public record AdminProductResponse(
    Long id,
    String name,
    String slug,
    String description,
    Long categoryId,
    String categoryName,
    Gender gender,
    BigDecimal price,
    BigDecimal oldPrice,
    ProductTag tag,
    ProductStatus status,
    String thumbnailUrl,
    Integer totalStock,
    List<ProductImageResponse> images,
    List<ProductVariantResponse> variants
) {
}
