package com.lunafashion.admin;

import com.lunafashion.admin.dto.AdminProductResponse;
import com.lunafashion.admin.dto.ProductCreateRequest;
import com.lunafashion.admin.dto.ProductImageRequest;
import com.lunafashion.admin.dto.ProductStatusUpdateRequest;
import com.lunafashion.admin.dto.ProductUpdateRequest;
import com.lunafashion.admin.dto.ProductVariantRequest;
import com.lunafashion.category.Category;
import com.lunafashion.category.CategoryRepository;
import com.lunafashion.common.SlugUtils;
import com.lunafashion.common.enums.Gender;
import com.lunafashion.common.enums.ProductStatus;
import com.lunafashion.common.enums.ProductTag;
import com.lunafashion.common.exception.BadRequestException;
import com.lunafashion.common.exception.ResourceNotFoundException;
import com.lunafashion.product.Product;
import com.lunafashion.product.ProductImage;
import com.lunafashion.product.ProductImageRepository;
import com.lunafashion.product.ProductRepository;
import com.lunafashion.product.ProductSpecification;
import com.lunafashion.product.ProductVariant;
import com.lunafashion.product.ProductVariantRepository;
import com.lunafashion.product.dto.ProductImageResponse;
import com.lunafashion.product.dto.ProductVariantResponse;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminProductService {

  private final ProductRepository productRepository;
  private final CategoryRepository categoryRepository;
  private final ProductImageRepository productImageRepository;
  private final ProductVariantRepository productVariantRepository;

  public AdminProductService(
      ProductRepository productRepository,
      CategoryRepository categoryRepository,
      ProductImageRepository productImageRepository,
      ProductVariantRepository productVariantRepository
  ) {
    this.productRepository = productRepository;
    this.categoryRepository = categoryRepository;
    this.productImageRepository = productImageRepository;
    this.productVariantRepository = productVariantRepository;
  }

  @Transactional(readOnly = true)
  public Page<AdminProductResponse> getProducts(
      String keyword,
      Long categoryId,
      String gender,
      String status,
      Pageable pageable
  ) {
    Specification<Product> specification = Specification.where(ProductSpecification.hasKeyword(keyword))
        .and(ProductSpecification.hasCategory(categoryId))
        .and(ProductSpecification.hasGender(parseGender(gender, false)))
        .and(ProductSpecification.hasStatus(parseStatus(status, false)));

    return productRepository.findAll(specification, pageable)
        .map(this::toResponse);
  }

  @Transactional(readOnly = true)
  public AdminProductResponse getProductById(Long id) {
    return toResponse(findProduct(id));
  }

  @Transactional
  public AdminProductResponse createProduct(ProductCreateRequest request) {
    String slug = resolveSlug(request.slug(), request.name());
    if (productRepository.existsBySlug(slug)) {
      throw new BadRequestException("Product slug already exists: " + slug);
    }

    Category category = findCategory(request.categoryId());
    Product product = Product.builder()
        .name(request.name().trim())
        .slug(slug)
        .description(request.description())
        .category(category)
        .gender(parseGender(request.gender(), true))
        .price(request.price())
        .oldPrice(request.oldPrice())
        .tag(parseTag(request.tag(), false))
        .status(resolveStatus(request.status()))
        .build();

    Product savedProduct = productRepository.save(product);
    replaceImages(savedProduct, request.images());
    replaceVariants(savedProduct, request.variants());

    return toResponse(savedProduct);
  }

  @Transactional
  public AdminProductResponse updateProduct(Long id, ProductUpdateRequest request) {
    Product product = findProduct(id);
    String slug = resolveSlug(request.slug(), request.name());
    if (productRepository.existsBySlugAndIdNot(slug, id)) {
      throw new BadRequestException("Product slug already exists: " + slug);
    }

    product.setName(request.name().trim());
    product.setSlug(slug);
    product.setDescription(request.description());
    product.setCategory(findCategory(request.categoryId()));
    product.setGender(parseGender(request.gender(), true));
    product.setPrice(request.price());
    product.setOldPrice(request.oldPrice());
    product.setTag(parseTag(request.tag(), false));
    product.setStatus(resolveStatus(request.status()));

    Product savedProduct = productRepository.save(product);
    replaceImages(savedProduct, request.images());
    replaceVariants(savedProduct, request.variants());

    return toResponse(savedProduct);
  }

  @Transactional
  public AdminProductResponse updateStatus(Long id, ProductStatusUpdateRequest request) {
    Product product = findProduct(id);
    product.setStatus(parseStatus(request.status(), true));
    return toResponse(productRepository.save(product));
  }

  @Transactional
  public AdminProductResponse deleteProduct(Long id) {
    Product product = findProduct(id);
    product.setStatus(ProductStatus.HIDDEN);
    return toResponse(productRepository.save(product));
  }

  private Product findProduct(Long id) {
    return productRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
  }

  private Category findCategory(Long categoryId) {
    return categoryRepository.findById(categoryId)
        .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + categoryId));
  }

  private void replaceImages(Product product, List<ProductImageRequest> images) {
    productImageRepository.deleteByProductId(product.getId());
    if (images == null || images.isEmpty()) {
      return;
    }

    List<ProductImage> productImages = images.stream()
        .map(request -> ProductImage.builder()
            .product(product)
            .imageUrl(request.imageUrl().trim())
            .thumbnail(Boolean.TRUE.equals(request.isThumbnail()))
            .sortOrder(request.sortOrder() == null ? 1 : request.sortOrder())
            .build())
        .toList();

    productImageRepository.saveAll(productImages);
  }

  private void replaceVariants(Product product, List<ProductVariantRequest> variants) {
    validateVariantSkus(product.getId(), variants);
    productVariantRepository.deleteByProductId(product.getId());
    if (variants == null || variants.isEmpty()) {
      return;
    }

    List<ProductVariant> productVariants = variants.stream()
        .map(request -> ProductVariant.builder()
            .product(product)
            .size(request.size().trim())
            .color(request.color().trim())
            .stock(request.stock() == null ? 0 : request.stock())
            .sku(request.sku().trim())
            .price(request.price())
            .build())
        .toList();

    productVariantRepository.saveAll(productVariants);
  }

  private void validateVariantSkus(Long productId, List<ProductVariantRequest> variants) {
    if (variants == null || variants.isEmpty()) {
      return;
    }

    Set<String> requestSkus = new HashSet<>();
    Set<String> currentProductSkus = productVariantRepository.findByProductId(productId)
        .stream()
        .map(ProductVariant::getSku)
        .collect(HashSet::new, HashSet::add, HashSet::addAll);

    for (ProductVariantRequest variant : variants) {
      String sku = variant.sku().trim();
      if (!requestSkus.add(sku)) {
        throw new BadRequestException("Duplicate SKU in request: " + sku);
      }

      productVariantRepository.findBySku(sku)
          .filter(existing -> !currentProductSkus.contains(existing.getSku()))
          .ifPresent(existing -> {
            throw new BadRequestException("SKU already exists: " + sku);
          });
    }
  }

  private String resolveSlug(String slug, String name) {
    String source = slug == null || slug.trim().isEmpty() ? name : slug;
    String resolved = SlugUtils.from(source);
    if (resolved.isEmpty()) {
      throw new BadRequestException("Product slug is invalid");
    }
    return resolved;
  }

  private ProductStatus resolveStatus(String status) {
    return status == null || status.trim().isEmpty()
        ? ProductStatus.SELLING
        : parseStatus(status, true);
  }

  private Gender parseGender(String gender, boolean required) {
    if (gender == null || gender.trim().isEmpty()) {
      if (required) {
        throw new BadRequestException("Gender is required");
      }
      return null;
    }

    try {
      return Gender.valueOf(gender.trim().toUpperCase());
    } catch (IllegalArgumentException exception) {
      throw new BadRequestException("Invalid gender: " + gender);
    }
  }

  private ProductStatus parseStatus(String status, boolean required) {
    if (status == null || status.trim().isEmpty()) {
      if (required) {
        throw new BadRequestException("Status is required");
      }
      return null;
    }

    try {
      return ProductStatus.valueOf(status.trim().toUpperCase());
    } catch (IllegalArgumentException exception) {
      throw new BadRequestException("Invalid product status: " + status);
    }
  }

  private ProductTag parseTag(String tag, boolean required) {
    if (tag == null || tag.trim().isEmpty()) {
      if (required) {
        throw new BadRequestException("Tag is required");
      }
      return null;
    }

    try {
      return ProductTag.valueOf(tag.trim().toUpperCase());
    } catch (IllegalArgumentException exception) {
      throw new BadRequestException("Invalid product tag: " + tag);
    }
  }

  private AdminProductResponse toResponse(Product product) {
    List<ProductImageResponse> images = productImageRepository.findByProductIdOrderBySortOrderAsc(product.getId())
        .stream()
        .map(this::toImageResponse)
        .toList();
    List<ProductVariantResponse> variants = productVariantRepository.findByProductId(product.getId())
        .stream()
        .map(this::toVariantResponse)
        .toList();

    return new AdminProductResponse(
        product.getId(),
        product.getName(),
        product.getSlug(),
        product.getDescription(),
        product.getCategory().getId(),
        product.getCategory().getName(),
        product.getGender(),
        product.getPrice(),
        product.getOldPrice(),
        product.getTag(),
        product.getStatus(),
        images.stream()
            .filter(ProductImageResponse::isThumbnail)
            .findFirst()
            .or(() -> images.stream().findFirst())
            .map(ProductImageResponse::imageUrl)
            .orElse(null),
        variants.stream().map(ProductVariantResponse::stock).reduce(0, Integer::sum),
        images,
        variants
    );
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
}
