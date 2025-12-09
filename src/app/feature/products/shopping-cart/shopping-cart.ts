import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { ShoppingCartService } from '../../../core/services/shopping-cart/shopping-cart.service';
import { Header } from '../../../core/header/header';
import { Footer } from '../../../core/footer/footer';
import { QuantidadeControle } from '../../../core/shared/quantidade-controle/quantidade-controle';
import { AuthService } from '../../auth/services/auth.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-shopping-cart',
  imports: [CommonModule, Header, Footer, QuantidadeControle, LucideAngularModule],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.css',
})
export class ShoppingCart {
  private loading = signal(true);
  private shoppingCart = inject(ShoppingCartService);
  private authService = inject(AuthService);
  private router = inject(Router);

  itensCart = this.shoppingCart.cart;
  userId = this.authService.idUser()!;

  constructor() {
    const userId = this.authService.idUser();

    if (userId !== null) {
      this.shoppingCart
        .getCartByUser(userId)
        .subscribe();
    }
  }


  subtotal = computed(() =>{
      let sum = 0;
    
      for (const item of this.itensCart()!.itens) {
        sum += item.preco * item.quantidade;
      }
    
      return sum;
    });
  
  taxes = computed(() => this.subtotal() * 0.1);
  
  total = computed(() => this.subtotal() + this.taxes());
  updateCartQuantity(productId: number, quantity: number) {
    this.shoppingCart.addOrUpdateItem(1, productId, quantity)
    .subscribe();
  }

  changeQuantity(id: number, quantidade: number, newQuantity: number) {

    if (newQuantity < 1) return;
    
    this.updateCartQuantity(
      id,
      newQuantity
    );
  }

  removeFromCart(productId: number) {
    this.shoppingCart.removeItem(productId).subscribe();
  }

  checkout() {
    if (this.itensCart() === null) return;

    this.shoppingCart.checkout(this.userId).subscribe(() => {
      this.navigate('/products/catalog');
    });
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }
}
