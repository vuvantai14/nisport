package com.lunafashion.product;

import com.lunafashion.common.enums.Gender;
import com.lunafashion.common.enums.ProductStatus;
import java.math.BigDecimal;
import org.springframework.data.jpa.domain.Specification;

public final class ProductSpecification {

  private ProductSpecification() {
  }

  public static Specification<Product> isSelling() {
    return (root, query, builder) -> builder.equal(root.get("status"), ProductStatus.SELLING);
  }

  public static Specification<Product> hasKeyword(String keyword) {
    return (root, query, builder) -> {
      if (keyword == null || keyword.trim().isEmpty()) {
        return builder.conjunction();
      }

      String pattern = "%" + keyword.trim().toLowerCase() + "%";
      return builder.or(
          builder.like(builder.lower(root.get("name")), pattern),
          builder.like(builder.lower(root.get("description")), pattern)
      );
    };
  }

  public static Specification<Product> hasGender(Gender gender) {
    return (root, query, builder) -> gender == null
        ? builder.conjunction()
        : builder.equal(root.get("gender"), gender);
  }

  public static Specification<Product> hasCategory(Long categoryId) {
    return (root, query, builder) -> categoryId == null
        ? builder.conjunction()
        : builder.equal(root.get("category").get("id"), categoryId);
  }

  public static Specification<Product> minPrice(BigDecimal minPrice) {
    return (root, query, builder) -> minPrice == null
        ? builder.conjunction()
        : builder.greaterThanOrEqualTo(root.get("price"), minPrice);
  }

  public static Specification<Product> maxPrice(BigDecimal maxPrice) {
    return (root, query, builder) -> maxPrice == null
        ? builder.conjunction()
        : builder.lessThanOrEqualTo(root.get("price"), maxPrice);
  }
}
