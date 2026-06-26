package com.lunafashion.category;

import com.lunafashion.common.BaseEntity;
import com.lunafashion.product.Product;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
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
@Table(name = "categories")
public class Category extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "name", nullable = false, length = 120)
  private String name;

  @Column(name = "slug", nullable = false, unique = true, length = 160)
  private String slug;

  @Column(name = "description", columnDefinition = "text")
  private String description;

  @Column(name = "active", nullable = false)
  private Boolean active;

  @Builder.Default
  @OneToMany(mappedBy = "category", fetch = FetchType.LAZY)
  private List<Product> products = new ArrayList<>();
}
