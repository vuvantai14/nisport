package com.lunafashion.cart;

import com.lunafashion.cart.dto.AddCartItemRequest;
import com.lunafashion.cart.dto.CartItemResponse;
import com.lunafashion.cart.dto.CartResponse;
import com.lunafashion.cart.dto.UpdateCartItemRequest;
import com.lunafashion.common.enums.ProductStatus;
import com.lunafashion.common.exception.BadRequestException;
import com.lunafashion.common.exception.ResourceNotFoundException;
import com.lunafashion.common.exception.UnauthorizedException;
import com.lunafashion.product.Product;
import com.lunafashion.product.ProductImageRepository;
import com.lunafashion.product.ProductRepository;
import com.lunafashion.product.ProductVariant;
import com.lunafashion.product.ProductVariantRepository;
import com.lunafashion.user.User;
import com.lunafashion.user.UserRepository;
import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CartService {

  private final CartRepository cartRepository;
  private final CartItemRepository cartItemRepository;
  private final ProductRepository productRepository;
  private final ProductVariantRepository productVariantRepository;
  private final ProductImageRepository productImageRepository;
  private final UserRepository userRepository;

  public CartService(
      CartRepository cartRepository,
      CartItemRepository cartItemRepository,
      ProductRepository productRepository,
      ProductVariantRepository productVariantRepository,
      ProductImageRepository productImageRepository,
      UserRepository userRepository
  ) {
    this.cartRepository = cartRepository;
    this.cartItemRepository = cartItemRepository;
    this.productRepository = productRepository;
    this.productVariantRepository = productVariantRepository;
    this.productImageRepository = productImageRepository;
    this.userRepository = userRepository;
  }

  @Transactional
  public CartResponse getCurrentCart() {
    User user = getCurrentUser();
    Cart cart = getOrCreateCart(user);
    return toCartResponse(cart);
  }

  @Transactional
  public CartResponse addItem(AddCartItemRequest request) {
    validateQuantity(request.quantity());

    User user = getCurrentUser();
    Cart cart = getOrCreateCart(user);
    Product product = productRepository.findById(request.productId())
        .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
    ProductVariant variant = productVariantRepository.findById(request.variantId())
        .orElseThrow(() -> new ResourceNotFoundException("Product variant not found"));

    validateProductCanBeAdded(product);
    validateVariantBelongsToProduct(variant, product);

    CartItem item = cartItemRepository
        .findByCartIdAndProductIdAndVariantId(cart.getId(), product.getId(), variant.getId())
        .orElse(null);
    int newQuantity = request.quantity() + (item == null ? 0 : item.getQuantity());
    validateStock(variant, newQuantity);

    BigDecimal unitPrice = resolveUnitPrice(product, variant);
    if (item == null) {
      item = CartItem.builder()
          .cart(cart)
          .product(product)
          .variant(variant)
          .quantity(newQuantity)
          .unitPrice(unitPrice)
          .build();
      cart.getItems().add(item);
    } else {
      item.setQuantity(newQuantity);
      item.setUnitPrice(unitPrice);
    }

    cartItemRepository.save(item);
    return toCartResponse(cart);
  }

  @Transactional
  public CartResponse updateItem(Long itemId, UpdateCartItemRequest request) {
    validateQuantity(request.quantity());

    User user = getCurrentUser();
    CartItem item = getOwnedCartItem(itemId, user);
    ProductVariant variant = item.getVariant();
    validateStock(variant, request.quantity());

    item.setQuantity(request.quantity());
    item.setUnitPrice(resolveUnitPrice(item.getProduct(), variant));
    cartItemRepository.save(item);

    return toCartResponse(item.getCart());
  }

  @Transactional
  public CartResponse removeItem(Long itemId) {
    User user = getCurrentUser();
    CartItem item = getOwnedCartItem(itemId, user);
    Cart cart = item.getCart();

    cart.getItems().remove(item);
    cartItemRepository.delete(item);
    return toCartResponse(cart);
  }

  @Transactional
  public CartResponse clearCart() {
    User user = getCurrentUser();
    Cart cart = getOrCreateCart(user);

    cart.getItems().clear();
    return toCartResponse(cart);
  }

  private User getCurrentUser() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication == null || !authentication.isAuthenticated()) {
      throw new UnauthorizedException("Unauthorized");
    }

    return userRepository.findByEmail(authentication.getName())
        .orElseThrow(() -> new ResourceNotFoundException("User not found"));
  }

  private Cart getOrCreateCart(User user) {
    return cartRepository.findByUserId(user.getId())
        .orElseGet(() -> cartRepository.save(Cart.builder().user(user).build()));
  }

  private CartItem getOwnedCartItem(Long itemId, User user) {
    return cartItemRepository.findByIdAndCartUserId(itemId, user.getId())
        .orElseThrow(() -> new ResourceNotFoundException("Cart item not found"));
  }

  private void validateQuantity(Integer quantity) {
    if (quantity == null || quantity <= 0) {
      throw new BadRequestException("Quantity must be greater than 0");
    }
  }

  private void validateProductCanBeAdded(Product product) {
    if (product.getStatus() == ProductStatus.HIDDEN
        || product.getStatus() == ProductStatus.STOPPED
        || product.getStatus() == ProductStatus.OUT_OF_STOCK) {
      throw new BadRequestException("Product is not available");
    }
  }

  private void validateVariantBelongsToProduct(ProductVariant variant, Product product) {
    if (!variant.getProduct().getId().equals(product.getId())) {
      throw new BadRequestException("Product variant does not belong to product");
    }
  }

  private void validateStock(ProductVariant variant, Integer quantity) {
    if (variant.getStock() == null || quantity > variant.getStock()) {
      throw new BadRequestException("Quantity exceeds available stock");
    }
  }

  private BigDecimal resolveUnitPrice(Product product, ProductVariant variant) {
    if (variant.getPrice() != null) {
      return variant.getPrice();
    }
    return product.getPrice();
  }

  private CartResponse toCartResponse(Cart cart) {
    List<CartItemResponse> items = cart.getItems().stream()
        .sorted(Comparator.comparing(CartItem::getId, Comparator.nullsLast(Long::compareTo)))
        .map(this::toCartItemResponse)
        .toList();

    int totalQuantity = items.stream()
        .mapToInt(CartItemResponse::quantity)
        .sum();
    BigDecimal totalAmount = items.stream()
        .map(CartItemResponse::subtotal)
        .reduce(BigDecimal.ZERO, BigDecimal::add);

    return new CartResponse(cart.getId(), cart.getUser().getId(), items, totalQuantity, totalAmount);
  }

  private CartItemResponse toCartItemResponse(CartItem item) {
    Product product = item.getProduct();
    ProductVariant variant = item.getVariant();
    BigDecimal price = item.getUnitPrice();
    BigDecimal subtotal = price.multiply(BigDecimal.valueOf(item.getQuantity()));
    String thumbnailUrl = productImageRepository.findFirstByProductIdAndThumbnailTrue(product.getId())
        .map(image -> image.getImageUrl())
        .orElse(null);

    return new CartItemResponse(
        item.getId(),
        product.getId(),
        product.getName(),
        product.getSlug(),
        thumbnailUrl,
        variant.getId(),
        variant.getSize(),
        variant.getColor(),
        variant.getSku(),
        price,
        item.getQuantity(),
        subtotal
    );
  }
}
