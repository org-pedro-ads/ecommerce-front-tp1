import { Component, EventEmitter, Output, Input, signal, SimpleChanges, inject } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { Product } from '../../../models/product';
import { MessageService } from '../../../core/services/message/message.service';
import { ShoppingCartService } from '../../../core/services/shopping-cart/shopping-cart.service';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './product-modal.html',
  styleUrl: './product-modal.css'
})
export class ProductModalComponent {

  private cartService = inject(ShoppingCartService);
  private authService = inject(AuthService);
  private message = inject(MessageService);

  
  @Output() close = new EventEmitter<void>();
  
  @Input() produto: Product = new Product(); 

  protected estoque = signal<number>(0);
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['produto'] && this.produto) {
      this.estoque.set(this.produto.quantidadeEstoque);
    }
  }
  
  closeModal() {
    this.close.emit();
  }


  addCard() {
    const userId = this.authService.idUser();
    
    if (!userId) {
      this.message.add('Você precisa estar logado para adicionar produtos ao carrinho', 'error');
      return;
    }

    console.log('Estoque atual:', this.produto.quantidadeEstoque);
    console.log('prouduto compelot: ', this.produto);

    if (this.produto.quantidadeEstoque === 0) {
      this.message.add('Produto sem estoque', 'error');
      return;
    }

    this.cartService.addOrUpdateItem(userId, this.produto.id, 1).subscribe({
      next: () => {
        this.message.add('Produto adicionado ao carrinho!', 'success');
      },
      error: (err) => {
        this.message.add('Erro ao adicionar produto ao carrinho', 'error');
      }
    });
  }
}