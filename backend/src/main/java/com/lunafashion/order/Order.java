package com.lunafashion.order;

import com.lunafashion.common.BaseEntity;
import com.lunafashion.common.enums.OrderStatus;
import com.lunafashion.common.enums.PaymentStatus;
import com.lunafashion.user.User;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
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
@Table(name = "orders")
public class Order extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "code", nullable = false, unique = true, length = 40)
  private String code;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private User user;

  @Column(name = "receiver_name", nullable = false, length = 120)
  private String receiverName;

  @Column(name = "receiver_phone", nullable = false, length = 30)
  private String receiverPhone;

  @Column(name = "shipping_address", nullable = false, columnDefinition = "text")
  private String shippingAddress;

  @Column(name = "subtotal", nullable = false, precision = 12, scale = 2)
  private BigDecimal subtotal;

  @Column(name = "shipping_fee", nullable = false, precision = 12, scale = 2)
  private BigDecimal shippingFee;

  @Column(name = "discount", nullable = false, precision = 12, scale = 2)
  private BigDecimal discount;

  @Column(name = "total", nullable = false, precision = 12, scale = 2)
  private BigDecimal total;

  @Column(name = "payment_method", nullable = false, length = 30)
  private String paymentMethod;

  @Enumerated(EnumType.STRING)
  @Column(name = "payment_status", nullable = false, length = 30)
  private PaymentStatus paymentStatus;

  @Enumerated(EnumType.STRING)
  @Column(name = "status", nullable = false, length = 30)
  private OrderStatus status;

  @Column(name = "note", columnDefinition = "text")
  private String note;

  @Builder.Default
  @OneToMany(mappedBy = "order", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
  private List<OrderItem> items = new ArrayList<>();
}
