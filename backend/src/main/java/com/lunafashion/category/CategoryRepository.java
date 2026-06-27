package com.lunafashion.category;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {

  List<Category> findByActiveTrueOrderByNameAsc();

  Optional<Category> findBySlug(String slug);

  boolean existsBySlug(String slug);

  boolean existsBySlugAndIdNot(String slug, Long id);
}
