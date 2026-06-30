package com.lunafashion.account.dto;

import com.lunafashion.common.enums.Role;
import com.lunafashion.common.enums.UserStatus;
import java.time.Instant;

public record AccountProfileResponse(
    Long id,
    String fullName,
    String email,
    String phone,
    Role role,
    UserStatus status,
    Instant createdAt
) {
}
