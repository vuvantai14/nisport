package com.lunafashion.config;

import com.lunafashion.common.enums.Role;
import com.lunafashion.common.enums.UserStatus;
import com.lunafashion.user.User;
import com.lunafashion.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

  private static final String ADMIN_EMAIL = "admin@lunafashion.com";

  @Bean
  public CommandLineRunner seedAdminUser(
      UserRepository userRepository,
      PasswordEncoder passwordEncoder
  ) {
    return args -> {
      if (userRepository.existsByEmail(ADMIN_EMAIL)) {
        return;
      }

      User admin = User.builder()
          .fullName("Luna Admin")
          .email(ADMIN_EMAIL)
          .passwordHash(passwordEncoder.encode("123456"))
          .phone("0900000000")
          .address("Luna Fashion Store")
          .role(Role.ADMIN)
          .status(UserStatus.ACTIVE)
          .build();

      userRepository.save(admin);
    };
  }
}
