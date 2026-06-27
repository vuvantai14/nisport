package com.lunafashion.admin.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record ProductImageRequest(
    @NotBlank(message = "Image URL is required")
    String imageUrl,
    Boolean isThumbnail,
    @Min(value = 1, message = "Sort order must be greater than 0")
    Integer sortOrder
) {
}
