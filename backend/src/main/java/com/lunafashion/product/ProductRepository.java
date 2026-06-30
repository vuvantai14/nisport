package com.lunafashion.product;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {

  Optional<Product> findBySlug(String slug);

  boolean existsBySlug(String slug);

  boolean existsBySlugAndIdNot(String slug, Long id);

  boolean existsByCategoryId(Long categoryId);

  @Query("""
      select count(distinct product.id)
      from Product product
      join product.variants variant
      where variant.stock <= :threshold
      """)
  long countLowStockProducts(@Param("threshold") int threshold);
}
