package com.lunafashion.auth;

import com.lunafashion.auth.dto.AuthResponse;
import com.lunafashion.auth.dto.CurrentUserResponse;
import com.lunafashion.auth.dto.LoginRequest;
import com.lunafashion.auth.dto.RegisterRequest;
import com.lunafashion.common.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

  private final AuthService authService;

  public AuthController(AuthService authService) {
    this.authService = authService;
  }

  @PostMapping("/register")
  public ApiResponse<CurrentUserResponse> register(@Valid @RequestBody RegisterRequest request) {
    return ApiResponse.success("Register successfully", authService.register(request));
  }

  @PostMapping("/login")
  public ApiResponse<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
    return ApiResponse.success("Login successfully", authService.login(request));
  }

  @GetMapping("/me")
  public ApiResponse<CurrentUserResponse> me() {
    return ApiResponse.success("Current user", authService.getCurrentUser());
  }
}
