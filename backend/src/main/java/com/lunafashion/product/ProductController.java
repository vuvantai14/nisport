package com.lunafashion.product;

import com.lunafashion.common.ApiResponse;
import com.lunafashion.product.dto.ProductDetailResponse;
import com.lunafashion.product.dto.ProductResponse;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

  private final ProductService productService;

  public ProductController(ProductService productService) {
    this.productService = productService;
  }

  @GetMapping
  public ApiResponse<Page<ProductResponse>> getProducts(
      @RequestParam(required = false) String keyword,
      @RequestParam(required = false) String gender,
      @RequestParam(required = false) Long categoryId,
      @RequestParam(required = false) BigDecimal minPrice,
      @RequestParam(required = false) BigDecimal maxPrice,
      Pageable pageable
  ) {
    return ApiResponse.success(
        "Products retrieved successfully",
        productService.getProducts(keyword, gender, categoryId, minPrice, maxPrice, pageable)
    );
  }

  @GetMapping("/{id}")
  public ApiResponse<ProductDetailResponse> getProductById(@PathVariable Long id) {
    return ApiResponse.success("Product retrieved successfully", productService.getProductById(id));
  }

  @GetMapping("/slug/{slug}")
  public ApiResponse<ProductDetailResponse> getProductBySlug(@PathVariable String slug) {
    return ApiResponse.success("Product retrieved successfully", productService.getProductBySlug(slug));
  }

  @GetMapping("/{id}/related")
  public ApiResponse<List<ProductResponse>> getRelatedProducts(@PathVariable Long id) {
    return ApiResponse.success("Related products retrieved successfully", productService.getRelatedProducts(id));
  }
}
