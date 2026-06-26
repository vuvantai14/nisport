package com.lunafashion.category;

import com.lunafashion.category.dto.CategoryResponse;
import com.lunafashion.common.ApiResponse;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/categories")
public class CategoryController {

  private final CategoryService categoryService;

  public CategoryController(CategoryService categoryService) {
    this.categoryService = categoryService;
  }

  @GetMapping
  public ApiResponse<List<CategoryResponse>> getCategories() {
    return ApiResponse.success("Categories retrieved successfully", categoryService.getAllActiveCategories());
  }

  @GetMapping("/{id}")
  public ApiResponse<CategoryResponse> getCategoryById(@PathVariable Long id) {
    return ApiResponse.success("Category retrieved successfully", categoryService.getCategoryById(id));
  }
}
