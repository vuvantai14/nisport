package com.lunafashion.admin.dto;

import jakarta.validation.constraints.NotNull;

public record CategoryActiveRequest(
    @NotNull(message = "Active value is required")
    Boolean active
) {
}
