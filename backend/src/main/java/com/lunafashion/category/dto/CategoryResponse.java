package com.lunafashion.category.dto;

public record CategoryResponse(
    Long id,
    String name,
    String slug,
    String description,
    Boolean active
) {
}
