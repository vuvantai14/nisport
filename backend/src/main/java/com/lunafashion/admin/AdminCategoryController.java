package com.lunafashion.admin;

import com.lunafashion.admin.dto.AdminCategoryResponse;
import com.lunafashion.admin.dto.CategoryActiveRequest;
import com.lunafashion.admin.dto.CategoryCreateRequest;
import com.lunafashion.admin.dto.CategoryUpdateRequest;
import com.lunafashion.common.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin/categories")
@PreAuthorize("hasRole('ADMIN')")
public class AdminCategoryController {

  private final AdminCategoryService adminCategoryService;

  public AdminCategoryController(AdminCategoryService adminCategoryService) {
    this.adminCategoryService = adminCategoryService;
  }

  @GetMapping
  public ApiResponse<List<AdminCategoryResponse>> getCategories() {
    return ApiResponse.success("Admin categories retrieved successfully", adminCategoryService.getCategories());
  }

  @GetMapping("/{id}")
  public ApiResponse<AdminCategoryResponse> getCategory(@PathVariable Long id) {
    return ApiResponse.success("Admin category retrieved successfully", adminCategoryService.getCategoryById(id));
  }

  @PostMapping
  public ApiResponse<AdminCategoryResponse> createCategory(@Valid @RequestBody CategoryCreateRequest request) {
    return ApiResponse.success("Category created successfully", adminCategoryService.createCategory(request));
  }

  @PutMapping("/{id}")
  public ApiResponse<AdminCategoryResponse> updateCategory(
      @PathVariable Long id,
      @Valid @RequestBody CategoryUpdateRequest request
  ) {
    return ApiResponse.success("Category updated successfully", adminCategoryService.updateCategory(id, request));
  }

  @PatchMapping("/{id}/active")
  public ApiResponse<AdminCategoryResponse> updateActive(
      @PathVariable Long id,
      @Valid @RequestBody CategoryActiveRequest request
  ) {
    return ApiResponse.success("Category active state updated successfully", adminCategoryService.updateActive(id, request));
  }

  @DeleteMapping("/{id}")
  public ApiResponse<AdminCategoryResponse> deleteCategory(@PathVariable Long id) {
    return ApiResponse.success("Category deleted successfully", adminCategoryService.deleteCategory(id));
  }
}
