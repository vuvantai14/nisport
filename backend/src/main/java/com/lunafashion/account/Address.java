package com.lunafashion.account;

import com.lunafashion.common.BaseEntity;
import com.lunafashion.user.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "addresses")
public class Address extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @Column(name = "receiver_name", nullable = false, length = 120)
  private String receiverName;

  @Column(name = "receiver_phone", nullable = false, length = 30)
  private String receiverPhone;

  @Column(name = "address_line", nullable = false, columnDefinition = "text")
  private String addressLine;

  @Column(name = "ward", nullable = false, length = 120)
  private String ward;

  @Column(name = "district", nullable = false, length = 120)
  private String district;

  @Column(name = "province", nullable = false, length = 120)
  private String province;

  @Column(name = "is_default", nullable = false)
  private Boolean defaultAddress;
}
