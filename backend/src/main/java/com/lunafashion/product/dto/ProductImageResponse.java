package com.lunafashion.product.dto;

public record ProductImageResponse(
    Long id,
    String imageUrl,
    Boolean isThumbnail,
    Integer sortOrder
) {
}
