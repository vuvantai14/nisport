package com.lunafashion.category;

import com.lunafashion.category.dto.CategoryResponse;
import com.lunafashion.common.exception.ResourceNotFoundException;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

  private final CategoryRepository categoryRepository;

  public CategoryService(CategoryRepository categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  public List<CategoryResponse> getAllActiveCategories() {
    return categoryRepository.findByActiveTrueOrderByNameAsc()
        .stream()
        .map(this::toResponse)
        .toList();
  }

  public CategoryResponse getCategoryById(Long id) {
    Category category = categoryRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));

    return toResponse(category);
  }

  public CategoryResponse toResponse(Category category) {
    return new CategoryResponse(
        category.getId(),
        category.getName(),
        category.getSlug(),
        category.getDescription(),
        category.getActive()
    );
  }
}
