package com.lunafashion.product;

import com.lunafashion.category.Category;
import com.lunafashion.category.CategoryService;
import com.lunafashion.category.dto.CategoryResponse;
import com.lunafashion.common.enums.Gender;
import com.lunafashion.common.enums.ProductStatus;
import com.lunafashion.common.exception.BadRequestException;
import com.lunafashion.common.exception.ResourceNotFoundException;
import com.lunafashion.product.dto.ProductDetailResponse;
import com.lunafashion.product.dto.ProductImageResponse;
import com.lunafashion.product.dto.ProductResponse;
import com.lunafashion.product.dto.ProductVariantResponse;
import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class ProductService {

  private final ProductRepository productRepository;
  private final ProductImageRepository productImageRepository;
  private final ProductVariantRepository productVariantRepository;
  private final CategoryService categoryService;

  public ProductService(
      ProductRepository productRepository,
      ProductImageRepository productImageRepository,
      ProductVariantRepository productVariantRepository,
      CategoryService categoryService
  ) {
    this.productRepository = productRepository;
    this.productImageRepository = productImageRepository;
    this.productVariantRepository = productVariantRepository;
    this.categoryService = categoryService;
  }

  public Page<ProductResponse> getProducts(
      String keyword,
      String gender,
      Long categoryId,
      BigDecimal minPrice,
      BigDecimal maxPrice,
      Pageable pageable
  ) {
    Gender parsedGender = parseGender(gender);
    Specification<Product> specification = Specification.where(ProductSpecification.isSelling())
        .and(ProductSpecification.hasKeyword(keyword))
        .and(ProductSpecification.hasGender(parsedGender))
        .and(ProductSpecification.hasCategory(categoryId))
        .and(ProductSpecification.minPrice(minPrice))
        .and(ProductSpecification.maxPrice(maxPrice));

    return productRepository.findAll(specification, pageable)
        .map(this::toProductResponse);
  }

  public ProductDetailResponse getProductById(Long id) {
    Product product = productRepository.findById(id)
        .filter(item -> item.getStatus() == ProductStatus.SELLING)
        .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));

    return toProductDetailResponse(product);
  }

  public ProductDetailResponse getProductBySlug(String slug) {
    Product product = productRepository.findBySlug(slug)
        .filter(item -> item.getStatus() == ProductStatus.SELLING)
        .orElseThrow(() -> new ResourceNotFoundException("Product not found with slug: " + slug));

    return toProductDetailResponse(product);
  }

  public List<ProductResponse> getRelatedProducts(Long id) {
    Product product = productRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));

    Specification<Product> specification = Specification.where(ProductSpecification.isSelling())
        .and(ProductSpecification.hasCategory(product.getCategory().getId()))
        .and((root, query, builder) -> builder.notEqual(root.get("id"), product.getId()));

    return productRepository.findAll(specification, Pageable.ofSize(8))
        .stream()
        .map(this::toProductResponse)
        .toList();
  }

  private Gender parseGender(String gender) {
    if (gender == null || gender.trim().isEmpty()) {
      return null;
    }

    try {
      return Gender.valueOf(gender.trim().toUpperCase());
    } catch (IllegalArgumentException exception) {
      throw new BadRequestException("Invalid gender: " + gender);
    }
  }

  private ProductResponse toProductResponse(Product product) {
    return new ProductResponse(
        product.getId(),
        product.getName(),
        product.getSlug(),
        product.getCategory().getId(),
        product.getCategory().getName(),
        product.getGender(),
        product.getPrice(),
        product.getOldPrice(),
        getThumbnailUrl(product.getId()),
        product.getTag(),
        product.getStatus(),
        getTotalStock(product.getId())
    );
  }

  private ProductDetailResponse toProductDetailResponse(Product product) {
    List<ProductImageResponse> images = productImageRepository.findByProductIdOrderBySortOrderAsc(product.getId())
        .stream()
        .map(this::toImageResponse)
        .toList();
    List<ProductVariantResponse> variants = productVariantRepository.findByProductId(product.getId())
        .stream()
        .map(this::toVariantResponse)
        .toList();

    return new ProductDetailResponse(
        product.getId(),
        product.getName(),
        product.getSlug(),
        toCategoryResponse(product.getCategory()),
        product.getGender(),
        product.getPrice(),
        product.getOldPrice(),
        product.getDescription(),
        product.getTag(),
        product.getStatus(),
        images,
        variants,
        sumStock(variants)
    );
  }

  private CategoryResponse toCategoryResponse(Category category) {
    return categoryService.toResponse(category);
  }

  private ProductImageResponse toImageResponse(ProductImage image) {
    return new ProductImageResponse(
        image.getId(),
        image.getImageUrl(),
        image.getThumbnail(),
        image.getSortOrder()
    );
  }

  private ProductVariantResponse toVariantResponse(ProductVariant variant) {
    return new ProductVariantResponse(
        variant.getId(),
        variant.getSize(),
        variant.getColor(),
        variant.getStock(),
        variant.getSku(),
        variant.getPrice()
    );
  }

  private String getThumbnailUrl(Long productId) {
    return productImageRepository.findFirstByProductIdAndThumbnailTrue(productId)
        .or(() -> productImageRepository.findByProductIdOrderBySortOrderAsc(productId)
            .stream()
            .min(Comparator.comparing(ProductImage::getSortOrder)))
        .map(ProductImage::getImageUrl)
        .orElse(null);
  }

  private Integer getTotalStock(Long productId) {
    return productVariantRepository.findByProductId(productId)
        .stream()
        .map(ProductVariant::getStock)
        .reduce(0, Integer::sum);
  }

  private Integer sumStock(List<ProductVariantResponse> variants) {
    return variants.stream()
        .map(ProductVariantResponse::stock)
        .reduce(0, Integer::sum);
  }
}
