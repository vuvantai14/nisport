package com.lunafashion.auth;

import com.lunafashion.auth.dto.AuthResponse;
import com.lunafashion.auth.dto.CurrentUserResponse;
import com.lunafashion.auth.dto.LoginRequest;
import com.lunafashion.auth.dto.RegisterRequest;
import com.lunafashion.common.enums.Role;
import com.lunafashion.common.enums.UserStatus;
import com.lunafashion.common.exception.BadRequestException;
import com.lunafashion.common.exception.ResourceNotFoundException;
import com.lunafashion.common.exception.UnauthorizedException;
import com.lunafashion.security.CustomUserDetails;
import com.lunafashion.security.JwtService;
import com.lunafashion.user.User;
import com.lunafashion.user.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;

  public AuthService(
      UserRepository userRepository,
      PasswordEncoder passwordEncoder,
      JwtService jwtService
  ) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtService = jwtService;
  }

  @Transactional
  public CurrentUserResponse register(RegisterRequest request) {
    String email = request.email().trim().toLowerCase();
    if (userRepository.existsByEmail(email)) {
      throw new BadRequestException("Email already exists");
    }

    User user = User.builder()
        .fullName(request.fullName().trim())
        .email(email)
        .passwordHash(passwordEncoder.encode(request.password()))
        .phone(trimToNull(request.phone()))
        .address(trimToNull(request.address()))
        .role(Role.USER)
        .status(UserStatus.ACTIVE)
        .build();

    return toCurrentUserResponse(userRepository.save(user));
  }

  @Transactional(readOnly = true)
  public AuthResponse login(LoginRequest request) {
    User user = userRepository.findByEmail(request.email().trim().toLowerCase())
        .orElseThrow(() -> new UnauthorizedException("Invalid email or password"));

    if (user.getStatus() == UserStatus.LOCKED) {
      throw new UnauthorizedException("Account is locked");
    }

    if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
      throw new UnauthorizedException("Invalid email or password");
    }

    CustomUserDetails userDetails = new CustomUserDetails(user);
    String token = jwtService.generateToken(userDetails);
    return new AuthResponse(token, "Bearer", toCurrentUserResponse(user));
  }

  @Transactional(readOnly = true)
  public CurrentUserResponse getCurrentUser() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication == null || !authentication.isAuthenticated()) {
      throw new UnauthorizedException("Unauthorized");
    }

    String email = authentication.getName();
    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new ResourceNotFoundException("User not found"));

    return toCurrentUserResponse(user);
  }

  private CurrentUserResponse toCurrentUserResponse(User user) {
    return new CurrentUserResponse(
        user.getId(),
        user.getFullName(),
        user.getEmail(),
        user.getPhone(),
        user.getAddress(),
        user.getRole(),
        user.getStatus()
    );
  }

  private String trimToNull(String value) {
    if (value == null || value.trim().isEmpty()) {
      return null;
    }
    return value.trim();
  }
}
