package com.lunafashion.account;

import com.lunafashion.account.dto.AccountProfileResponse;
import com.lunafashion.account.dto.AddressRequest;
import com.lunafashion.account.dto.AddressResponse;
import com.lunafashion.account.dto.ChangePasswordRequest;
import com.lunafashion.account.dto.UpdateProfileRequest;
import com.lunafashion.common.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/account")
public class AccountController {

  private final AccountService accountService;

  public AccountController(AccountService accountService) {
    this.accountService = accountService;
  }

  @GetMapping("/profile")
  public ApiResponse<AccountProfileResponse> getProfile() {
    return ApiResponse.success("Profile retrieved successfully", accountService.getProfile());
  }

  @PutMapping("/profile")
  public ApiResponse<AccountProfileResponse> updateProfile(@Valid @RequestBody UpdateProfileRequest request) {
    return ApiResponse.success("Profile updated successfully", accountService.updateProfile(request));
  }

  @PatchMapping("/password")
  public ApiResponse<AccountProfileResponse> changePassword(@Valid @RequestBody ChangePasswordRequest request) {
    return ApiResponse.success("Password changed successfully", accountService.changePassword(request));
  }

  @GetMapping("/addresses")
  public ApiResponse<List<AddressResponse>> getAddresses() {
    return ApiResponse.success("Addresses retrieved successfully", accountService.getAddresses());
  }

  @PostMapping("/addresses")
  public ApiResponse<AddressResponse> createAddress(@Valid @RequestBody AddressRequest request) {
    return ApiResponse.success("Address created successfully", accountService.createAddress(request));
  }

  @PutMapping("/addresses/{id}")
  public ApiResponse<AddressResponse> updateAddress(
      @PathVariable Long id,
      @Valid @RequestBody AddressRequest request
  ) {
    return ApiResponse.success("Address updated successfully", accountService.updateAddress(id, request));
  }

  @DeleteMapping("/addresses/{id}")
  public ApiResponse<Void> deleteAddress(@PathVariable Long id) {
    accountService.deleteAddress(id);
    return ApiResponse.success("Address deleted successfully");
  }

  @PatchMapping("/addresses/{id}/default")
  public ApiResponse<AddressResponse> setDefaultAddress(@PathVariable Long id) {
    return ApiResponse.success("Default address updated successfully", accountService.setDefaultAddress(id));
  }
}
