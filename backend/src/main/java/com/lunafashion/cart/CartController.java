package com.lunafashion.cart;

import com.lunafashion.cart.dto.AddCartItemRequest;
import com.lunafashion.cart.dto.CartResponse;
import com.lunafashion.cart.dto.UpdateCartItemRequest;
import com.lunafashion.common.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/cart")
public class CartController {

  private final CartService cartService;

  public CartController(CartService cartService) {
    this.cartService = cartService;
  }

  @GetMapping
  public ApiResponse<CartResponse> getCart() {
    return ApiResponse.success("Cart loaded", cartService.getCurrentCart());
  }

  @PostMapping("/items")
  public ApiResponse<CartResponse> addItem(@Valid @RequestBody AddCartItemRequest request) {
    return ApiResponse.success("Cart item added", cartService.addItem(request));
  }

  @PutMapping("/items/{itemId}")
  public ApiResponse<CartResponse> updateItem(
      @PathVariable Long itemId,
      @Valid @RequestBody UpdateCartItemRequest request
  ) {
    return ApiResponse.success("Cart item updated", cartService.updateItem(itemId, request));
  }

  @DeleteMapping("/items/{itemId}")
  public ApiResponse<CartResponse> removeItem(@PathVariable Long itemId) {
    return ApiResponse.success("Cart item removed", cartService.removeItem(itemId));
  }

  @DeleteMapping
  public ApiResponse<CartResponse> clearCart() {
    return ApiResponse.success("Cart cleared", cartService.clearCart());
  }
}
