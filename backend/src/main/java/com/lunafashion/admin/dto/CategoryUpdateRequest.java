package com.lunafashion.admin.dto;

import jakarta.validation.constraints.NotBlank;

public record CategoryUpdateRequest(
    @NotBlank(message = "Category name is required")
    String name,
    String slug,
    String description,
    Boolean active
) {
}
