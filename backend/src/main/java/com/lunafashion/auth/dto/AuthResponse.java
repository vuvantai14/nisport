package com.lunafashion.auth.dto;

public record AuthResponse(
    String accessToken,
    String tokenType,
    CurrentUserResponse user
) {
}
