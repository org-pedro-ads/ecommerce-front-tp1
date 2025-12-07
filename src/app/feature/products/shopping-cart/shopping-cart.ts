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

@Component({
  selector: 'app-shopping-cart',
  imports: [CommonModule, Header, Footer],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.css',
})
export class ShoppingCart {
  private loading = signal(true);
  private shoppingtCart = inject(ShoppingCartService);
  private router = inject(Router);

  // itensCart = toSignal<Order | null>(this.shoppingtCart.getCartByUser(11)
  // .pipe(finalize(() => this.loading.set(false))), {
  //   initialValue: null
  // });

  itensCart = signal({
    id: 1,
    itens: [
      {
        id: 1,
        produto: {
          id: 101,
          nome: 'Café Especial Torrado 250g',
          preco: 24.9
        },
        quantidade: 1,
        preco: 24.9,
        subTotal: 24.9
      },
      {
        id: 2,
        produto: {
          id: 102,
          nome: 'Chocolate 70% Cacau',
          preco: 12.5
        },
        quantidade: 2,
        preco: 12.5,
        subTotal: 25.0
      }
    ],
    dataPedido: 12/12/2025,
    valorTotal: 100.0,
    status: 'PAGO'
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

  changeQuantity(item: OrderItem, delta: number) {
    const novaQuantidade = item.quantidade + delta;
  
    if (novaQuantidade < 1) return;
  
    this.updateCartQuantity(
      item.id,
      novaQuantidade
    );
  }
  

  removeFromCart(productId: number) {
    this.shoppingtCart.removeItem(productId);
  }

  checkout() {
    if (this.itensCart() === null) return;

    this.shoppingtCart.checkout(12);
    this.router.navigate(['/history']);
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }
}
