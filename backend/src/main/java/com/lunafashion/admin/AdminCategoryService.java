package com.lunafashion.admin;

import com.lunafashion.admin.dto.AdminCategoryResponse;
import com.lunafashion.admin.dto.CategoryActiveRequest;
import com.lunafashion.admin.dto.CategoryCreateRequest;
import com.lunafashion.admin.dto.CategoryUpdateRequest;
import com.lunafashion.category.Category;
import com.lunafashion.category.CategoryRepository;
import com.lunafashion.common.SlugUtils;
import com.lunafashion.common.exception.BadRequestException;
import com.lunafashion.common.exception.ResourceNotFoundException;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminCategoryService {

  private final CategoryRepository categoryRepository;

  public AdminCategoryService(CategoryRepository categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  @Transactional(readOnly = true)
  public List<AdminCategoryResponse> getCategories() {
    return categoryRepository.findAll(Sort.by(Sort.Direction.ASC, "name"))
        .stream()
        .map(this::toResponse)
        .toList();
  }

  @Transactional(readOnly = true)
  public AdminCategoryResponse getCategoryById(Long id) {
    return toResponse(findCategory(id));
  }

  @Transactional
  public AdminCategoryResponse createCategory(CategoryCreateRequest request) {
    String slug = resolveSlug(request.slug(), request.name());
    if (categoryRepository.existsBySlug(slug)) {
      throw new BadRequestException("Category slug already exists: " + slug);
    }

    Category category = Category.builder()
        .name(request.name().trim())
        .slug(slug)
        .description(request.description())
        .active(request.active() == null || request.active())
        .build();

    return toResponse(categoryRepository.save(category));
  }

  @Transactional
  public AdminCategoryResponse updateCategory(Long id, CategoryUpdateRequest request) {
    Category category = findCategory(id);
    String slug = resolveSlug(request.slug(), request.name());
    if (categoryRepository.existsBySlugAndIdNot(slug, id)) {
      throw new BadRequestException("Category slug already exists: " + slug);
    }

    category.setName(request.name().trim());
    category.setSlug(slug);
    category.setDescription(request.description());
    category.setActive(request.active() == null || request.active());

    return toResponse(categoryRepository.save(category));
  }

  @Transactional
  public AdminCategoryResponse updateActive(Long id, CategoryActiveRequest request) {
    Category category = findCategory(id);
    category.setActive(request.active());
    return toResponse(categoryRepository.save(category));
  }

  @Transactional
  public AdminCategoryResponse deleteCategory(Long id) {
    Category category = findCategory(id);
    category.setActive(false);
    return toResponse(categoryRepository.save(category));
  }

  private Category findCategory(Long id) {
    return categoryRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
  }

  private String resolveSlug(String slug, String name) {
    String source = slug == null || slug.trim().isEmpty() ? name : slug;
    String resolved = SlugUtils.from(source);
    if (resolved.isEmpty()) {
      throw new BadRequestException("Category slug is invalid");
    }
    return resolved;
  }

  private AdminCategoryResponse toResponse(Category category) {
    return new AdminCategoryResponse(
        category.getId(),
        category.getName(),
        category.getSlug(),
        category.getDescription(),
        category.getActive()
    );
  }
}
