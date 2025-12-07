import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { Order } from '../../../models/order';
import { finalize } from 'rxjs';
import { ShoppingCartService } from '../../../core/services/shopping-cart/shopping-cart.service';
import { OrderItem } from '../../../models/orderItem';
import { Header } from '../../../core/header/header';
import { Footer } from '../../../core/footer/footer';
import { QuantidadeControle } from '../../../core/shared/quantidade-controle/quantidade-controle';

@Component({
  selector: 'app-shopping-cart',
  imports: [CommonModule, Header, Footer, QuantidadeControle],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.css',
})
export class ShoppingCart {
  private loading = signal(true);
  private shoppingtCart = inject(ShoppingCartService);
  private router = inject(Router);

  itensCart = toSignal<Order | null>(this.shoppingtCart.getCartByUser(1)
  .pipe(finalize(() => this.loading.set(false))), {
    initialValue: null
  });

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
    this.shoppingtCart.updateItem(productId, quantity);
  }

  changeQuantity(id: number, quantidade: number, delta: number) {
    const novaQuantidade = quantidade + delta;
  
    if (novaQuantidade < 1) return;
    
    this.updateCartQuantity(
      id,
      novaQuantidade
    );
  }

  removeFromCart(productId: number) {
    this.shoppingtCart.removeItem(productId);
  }

  checkout() {
    if (this.itensCart() === null) return;

    this.shoppingtCart.checkout(1);
    this.router.navigate(['/history']);
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }
}
