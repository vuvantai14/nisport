package com.lunafashion.admin.dto;

import jakarta.validation.constraints.NotBlank;

public record ProductStatusUpdateRequest(
    @NotBlank(message = "Status is required")
    String status
) {
}
