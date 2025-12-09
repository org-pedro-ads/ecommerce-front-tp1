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
import { MessageService } from '../../../core/services/message/message.service';
import { SidebarComponent } from "../../sidebar/sidebar";

@Component({
  selector: 'app-shopping-cart',
  imports: [CommonModule, Header, Footer, QuantidadeControle, LucideAngularModule, SidebarComponent],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.css',
})
export class ShoppingCart {
  private shoppingCart = inject(ShoppingCartService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);

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
    this.shoppingCart.addOrUpdateItem(this.userId, productId, quantity)
    .subscribe({
      next: () => {
        this.messageService.add('Quantidade atualizada com sucesso.', 'success');
      },
      error: (err) => {
        console.error('Erro ao atualizar quantidade do carrinho', err);
        this.messageService.add('Erro ao atualizar quantidade do carrinho.', 'error');
      }
    });
  }

  changeQuantity(id: number, quantidade: number, newQuantity: number) {

    if (newQuantity < 1) return;
    
    this.updateCartQuantity(
      id,
      newQuantity
    );
  }

  removeFromCart(productId: number) {
    this.shoppingCart.removeItem(productId).subscribe({
      next: () => {
        this.messageService.add('Item removido do carrinho.', 'success');
      },
      error: (err) => {
        console.error('Erro ao remover item do carrinho', err);
        this.messageService.add('Erro ao remover item do carrinho.', 'error');
      }
    });
  }

  checkout() {
    if (this.itensCart() === null) return;

    this.shoppingCart.checkout(this.userId).subscribe({
      next: () => {
        this.messageService.add('Compra realizada com sucesso!', 'success');
        this.router.navigate(['/products/catalog']);
      },
      error: (err) => {
        console.error('Erro ao finalizar compra', err);
        this.messageService.add('Erro ao finalizar compra.', 'error');
      }
    });
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }
}
