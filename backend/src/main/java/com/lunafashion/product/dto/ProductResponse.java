package com.lunafashion.product.dto;

import com.lunafashion.common.enums.Gender;
import com.lunafashion.common.enums.ProductStatus;
import com.lunafashion.common.enums.ProductTag;
import java.math.BigDecimal;

public record ProductResponse(
    Long id,
    String name,
    String slug,
    Long categoryId,
    String categoryName,
    Gender gender,
    BigDecimal price,
    BigDecimal oldPrice,
    String thumbnailUrl,
    ProductTag tag,
    ProductStatus status,
    Integer totalStock
) {
}
