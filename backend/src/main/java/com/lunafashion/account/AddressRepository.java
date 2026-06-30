package com.lunafashion.account;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AddressRepository extends JpaRepository<Address, Long> {

  List<Address> findByUserIdOrderByDefaultAddressDescCreatedAtDesc(Long userId);

  Optional<Address> findByIdAndUserId(Long id, Long userId);

  Optional<Address> findFirstByUserIdOrderByCreatedAtAsc(Long userId);

  long countByUserId(Long userId);

  boolean existsByUserIdAndDefaultAddressTrue(Long userId);

  @Modifying
  @Query("update Address address set address.defaultAddress = false where address.user.id = :userId")
  void clearDefaultByUserId(@Param("userId") Long userId);
}
