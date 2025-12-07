import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  imports: [],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.css',
})
export class ShoppingCart {
  private cartService = inject(CartService);
  private router = inject(Router);

  get cartItems() {
    return this.cartService.cartItems();
  }

  updateCartQuantity(productId: number, quantity: number) {
    this.cartService.updateCartQuantity(productId, quantity);
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  subtotal(): number {
    return this.cartService.getCartTotal();
  }

  taxes(): number {
    return this.subtotal() * 0.1;
  }

  total(): number {
    return this.subtotal() + this.taxes();
  }

  checkout() {
    if (this.cartItems.length === 0) return;

    this.cartService.createOrder();
    alert('Pedido finalizado com sucesso!');
    this.router.navigate(['/history']);
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }
}
