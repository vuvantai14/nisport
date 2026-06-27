package com.lunafashion.admin.dto;

public record AdminCategoryResponse(
    Long id,
    String name,
    String slug,
    String description,
    Boolean active
) {
}
