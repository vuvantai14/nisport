package com.lunafashion.account;

import com.lunafashion.account.dto.AccountProfileResponse;
import com.lunafashion.account.dto.AddressRequest;
import com.lunafashion.account.dto.AddressResponse;
import com.lunafashion.account.dto.ChangePasswordRequest;
import com.lunafashion.account.dto.UpdateProfileRequest;
import com.lunafashion.common.exception.BadRequestException;
import com.lunafashion.common.exception.ResourceNotFoundException;
import com.lunafashion.common.exception.UnauthorizedException;
import com.lunafashion.user.User;
import com.lunafashion.user.UserRepository;
import java.util.List;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AccountService {

  private final UserRepository userRepository;
  private final AddressRepository addressRepository;
  private final PasswordEncoder passwordEncoder;

  public AccountService(
      UserRepository userRepository,
      AddressRepository addressRepository,
      PasswordEncoder passwordEncoder
  ) {
    this.userRepository = userRepository;
    this.addressRepository = addressRepository;
    this.passwordEncoder = passwordEncoder;
  }

  @Transactional(readOnly = true)
  public AccountProfileResponse getProfile() {
    return toProfileResponse(getCurrentUser());
  }

  @Transactional
  public AccountProfileResponse updateProfile(UpdateProfileRequest request) {
    User user = getCurrentUser();
    user.setFullName(request.fullName().trim());
    user.setPhone(trimToNull(request.phone()));
    return toProfileResponse(userRepository.save(user));
  }

  @Transactional
  public AccountProfileResponse changePassword(ChangePasswordRequest request) {
    User user = getCurrentUser();
    if (!passwordEncoder.matches(request.oldPassword(), user.getPasswordHash())) {
      throw new BadRequestException("Old password is incorrect");
    }
    if (!request.newPassword().equals(request.confirmPassword())) {
      throw new BadRequestException("New password and confirm password do not match");
    }

    user.setPasswordHash(passwordEncoder.encode(request.newPassword()));
    return toProfileResponse(userRepository.save(user));
  }

  @Transactional(readOnly = true)
  public List<AddressResponse> getAddresses() {
    User user = getCurrentUser();
    return addressRepository.findByUserIdOrderByDefaultAddressDescCreatedAtDesc(user.getId())
        .stream()
        .map(this::toAddressResponse)
        .toList();
  }

  @Transactional
  public AddressResponse createAddress(AddressRequest request) {
    User user = getCurrentUser();
    boolean firstAddress = addressRepository.countByUserId(user.getId()) == 0;
    boolean makeDefault = firstAddress || Boolean.TRUE.equals(request.isDefault());
    if (makeDefault) {
      addressRepository.clearDefaultByUserId(user.getId());
    }

    Address address = Address.builder()
        .user(user)
        .receiverName(request.receiverName().trim())
        .receiverPhone(request.receiverPhone().trim())
        .addressLine(request.addressLine().trim())
        .ward(request.ward().trim())
        .district(request.district().trim())
        .province(request.province().trim())
        .defaultAddress(makeDefault)
        .build();

    return toAddressResponse(addressRepository.save(address));
  }

  @Transactional
  public AddressResponse updateAddress(Long id, AddressRequest request) {
    User user = getCurrentUser();
    Address address = getOwnedAddress(id, user);
    boolean wasDefault = Boolean.TRUE.equals(address.getDefaultAddress());
    boolean requestedDefault = Boolean.TRUE.equals(request.isDefault());

    if (requestedDefault) {
      addressRepository.clearDefaultByUserId(user.getId());
    }

    address.setReceiverName(request.receiverName().trim());
    address.setReceiverPhone(request.receiverPhone().trim());
    address.setAddressLine(request.addressLine().trim());
    address.setWard(request.ward().trim());
    address.setDistrict(request.district().trim());
    address.setProvince(request.province().trim());
    address.setDefaultAddress(requestedDefault);

    Address savedAddress = addressRepository.save(address);
    if (wasDefault && !requestedDefault) {
      ensureDefaultAddress(user.getId());
      savedAddress = addressRepository.findById(savedAddress.getId()).orElse(savedAddress);
    }
    return toAddressResponse(savedAddress);
  }

  @Transactional
  public void deleteAddress(Long id) {
    User user = getCurrentUser();
    Address address = getOwnedAddress(id, user);
    boolean wasDefault = Boolean.TRUE.equals(address.getDefaultAddress());

    addressRepository.delete(address);
    addressRepository.flush();

    if (wasDefault) {
      ensureDefaultAddress(user.getId());
    }
  }

  @Transactional
  public AddressResponse setDefaultAddress(Long id) {
    User user = getCurrentUser();
    Address address = getOwnedAddress(id, user);
    addressRepository.clearDefaultByUserId(user.getId());
    address.setDefaultAddress(true);
    return toAddressResponse(addressRepository.save(address));
  }

  private User getCurrentUser() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication == null || !authentication.isAuthenticated()) {
      throw new UnauthorizedException("Unauthorized");
    }

    return userRepository.findByEmail(authentication.getName())
        .orElseThrow(() -> new ResourceNotFoundException("User not found"));
  }

  private Address getOwnedAddress(Long id, User user) {
    return addressRepository.findByIdAndUserId(id, user.getId())
        .orElseThrow(() -> new ResourceNotFoundException("Address not found"));
  }

  private void ensureDefaultAddress(Long userId) {
    if (addressRepository.existsByUserIdAndDefaultAddressTrue(userId)) {
      return;
    }

    addressRepository.findFirstByUserIdOrderByCreatedAtAsc(userId).ifPresent(address -> {
      address.setDefaultAddress(true);
      addressRepository.save(address);
    });
  }

  private AccountProfileResponse toProfileResponse(User user) {
    return new AccountProfileResponse(
        user.getId(),
        user.getFullName(),
        user.getEmail(),
        user.getPhone(),
        user.getRole(),
        user.getStatus(),
        user.getCreatedAt()
    );
  }

  private AddressResponse toAddressResponse(Address address) {
    return new AddressResponse(
        address.getId(),
        address.getUser().getId(),
        address.getReceiverName(),
        address.getReceiverPhone(),
        address.getAddressLine(),
        address.getWard(),
        address.getDistrict(),
        address.getProvince(),
        address.getDefaultAddress(),
        address.getCreatedAt(),
        address.getUpdatedAt()
    );
  }

  private String trimToNull(String value) {
    if (value == null || value.trim().isEmpty()) {
      return null;
    }
    return value.trim();
  }
}
