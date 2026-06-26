package com.lunafashion.auth.dto;

import com.lunafashion.common.enums.Role;
import com.lunafashion.common.enums.UserStatus;

public record CurrentUserResponse(
    Long id,
    String fullName,
    String email,
    String phone,
    String address,
    Role role,
    UserStatus status
) {
}
