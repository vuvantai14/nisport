package com.lunafashion.product;

import com.lunafashion.category.Category;
import com.lunafashion.common.BaseEntity;
import com.lunafashion.common.enums.Gender;
import com.lunafashion.common.enums.ProductStatus;
import com.lunafashion.common.enums.ProductTag;
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
@Table(name = "products")
public class Product extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "name", nullable = false, length = 180)
  private String name;

  @Column(name = "slug", nullable = false, unique = true, length = 220)
  private String slug;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "category_id", nullable = false)
  private Category category;

  @Enumerated(EnumType.STRING)
  @Column(name = "gender", nullable = false, length = 20)
  private Gender gender;

  @Column(name = "price", nullable = false, precision = 12, scale = 2)
  private BigDecimal price;

  @Column(name = "old_price", precision = 12, scale = 2)
  private BigDecimal oldPrice;

  @Column(name = "description", columnDefinition = "text")
  private String description;

  @Enumerated(EnumType.STRING)
  @Column(name = "tag", length = 20)
  private ProductTag tag;

  @Enumerated(EnumType.STRING)
  @Column(name = "status", nullable = false, length = 30)
  private ProductStatus status;

  @Builder.Default
  @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  private List<ProductVariant> variants = new ArrayList<>();

  @Builder.Default
  @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  private List<ProductImage> images = new ArrayList<>();
}
