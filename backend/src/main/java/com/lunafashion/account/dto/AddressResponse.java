package com.lunafashion.account.dto;

import java.time.Instant;

public record AddressResponse(
    Long id,
    Long userId,
    String receiverName,
    String receiverPhone,
    String addressLine,
    String ward,
    String district,
    String province,
    Boolean isDefault,
    Instant createdAt,
    Instant updatedAt
) {
}
