package com.lunafashion.account.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ChangePasswordRequest(
    @NotBlank String oldPassword,
    @NotBlank @Size(min = 6) String newPassword,
    @NotBlank String confirmPassword
) {
}
