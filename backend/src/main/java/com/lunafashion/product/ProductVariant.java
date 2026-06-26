package com.lunafashion.product;

import com.lunafashion.cart.CartItem;
import com.lunafashion.common.BaseEntity;
import com.lunafashion.order.OrderItem;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "product_variants")
public class ProductVariant extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "product_id", nullable = false)
  private Product product;

  @Column(name = "size", nullable = false, length = 30)
  private String size;

  @Column(name = "color", nullable = false, length = 60)
  private String color;

  @Column(name = "stock", nullable = false)
  private Integer stock;

  @Column(name = "sku", nullable = false, unique = true, length = 80)
  private String sku;

  @Column(name = "price", precision = 12, scale = 2)
  private BigDecimal price;

  @Builder.Default
  @OneToMany(mappedBy = "variant", fetch = FetchType.LAZY)
  private List<CartItem> cartItems = new ArrayList<>();

  @Builder.Default
  @OneToMany(mappedBy = "variant", fetch = FetchType.LAZY)
  private List<OrderItem> orderItems = new ArrayList<>();
}
