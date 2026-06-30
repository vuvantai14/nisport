package com.lunafashion.account.dto;

import jakarta.validation.constraints.NotBlank;

public record AddressRequest(
    @NotBlank String receiverName,
    @NotBlank String receiverPhone,
    @NotBlank String addressLine,
    @NotBlank String ward,
    @NotBlank String district,
    @NotBlank String province,
    Boolean isDefault
) {
}
