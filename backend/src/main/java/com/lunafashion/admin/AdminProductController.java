package com.lunafashion.admin;

import com.lunafashion.admin.dto.AdminProductResponse;
import com.lunafashion.admin.dto.ProductCreateRequest;
import com.lunafashion.admin.dto.ProductStatusUpdateRequest;
import com.lunafashion.admin.dto.ProductUpdateRequest;
import com.lunafashion.common.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin/products")
@PreAuthorize("hasRole('ADMIN')")
public class AdminProductController {

  private final AdminProductService adminProductService;

  public AdminProductController(AdminProductService adminProductService) {
    this.adminProductService = adminProductService;
  }

  @GetMapping
  public ApiResponse<Page<AdminProductResponse>> getProducts(
      @RequestParam(required = false) String keyword,
      @RequestParam(required = false) Long categoryId,
      @RequestParam(required = false) String gender,
      @RequestParam(required = false) String status,
      Pageable pageable
  ) {
    return ApiResponse.success(
        "Admin products retrieved successfully",
        adminProductService.getProducts(keyword, categoryId, gender, status, pageable)
    );
  }

  @GetMapping("/{id}")
  public ApiResponse<AdminProductResponse> getProduct(@PathVariable Long id) {
    return ApiResponse.success("Admin product retrieved successfully", adminProductService.getProductById(id));
  }

  @PostMapping
  public ApiResponse<AdminProductResponse> createProduct(@Valid @RequestBody ProductCreateRequest request) {
    return ApiResponse.success("Product created successfully", adminProductService.createProduct(request));
  }

  @PutMapping("/{id}")
  public ApiResponse<AdminProductResponse> updateProduct(
      @PathVariable Long id,
      @Valid @RequestBody ProductUpdateRequest request
  ) {
    return ApiResponse.success("Product updated successfully", adminProductService.updateProduct(id, request));
  }

  @PatchMapping("/{id}/status")
  public ApiResponse<AdminProductResponse> updateStatus(
      @PathVariable Long id,
      @Valid @RequestBody ProductStatusUpdateRequest request
  ) {
    return ApiResponse.success("Product status updated successfully", adminProductService.updateStatus(id, request));
  }

  @DeleteMapping("/{id}")
  public ApiResponse<AdminProductResponse> deleteProduct(@PathVariable Long id) {
    return ApiResponse.success("Product deleted successfully", adminProductService.deleteProduct(id));
  }
}
