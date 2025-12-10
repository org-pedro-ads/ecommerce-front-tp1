import { Component, inject, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { ShoppingCartService } from '../../../core/services/shopping-cart/shopping-cart.service';
import { AuthService } from '../../auth/services/auth.service';
import { MessageService } from '../../../core/services/message/message.service';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './card-product.html',
  styleUrl: './card-product.css',
})
export class CardProduct {

  private cartService = inject(ShoppingCartService);
  private authService = inject(AuthService);
  private message = inject(MessageService);

  @Input() produto: any = {
    nome: 'Produto Exemplo',
    categoria: 'Tecnologia',
    descricao: 'Uma descrição breve do produto para teste de layout.',
    preco: '99,90',
    quantidadeEstoque: 10,
    caracteristicas: ['Rápido', 'Durável', 'Econômico'],
  };

  addCard(event: MouseEvent) {
    event.stopPropagation();
    
    const userId = this.authService.idUser();
    
    if (!userId) {
      this.message.add('Você precisa estar logado para adicionar produtos ao carrinho', 'error');
      return;
    }
    
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