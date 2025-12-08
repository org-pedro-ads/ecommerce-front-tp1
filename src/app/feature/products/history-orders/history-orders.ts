import { Component, inject, signal } from '@angular/core';
import { Header } from '../../../core/header/header'
import { Footer } from '../../../core/footer/footer';
import { LucideAngularModule } from 'lucide-angular';
import { MessageService } from '../../../core/services/message/message.service';
import { AuthService } from '../../auth/services/auth.service';
import { ProductService } from '../../../core/services/product/product.service';
import { HistoryOrderService } from '../../../core/services/history-ordes/history-orders.service';
import { Order } from '../../../models/order';

@Component({
  selector: 'app-history-orders',
  imports: [Header, Footer, LucideAngularModule],
  templateUrl: './history-orders.html',
  styleUrl: './history-orders.css',
})
export class HistoryOrders {

  private message = inject(MessageService);
  private auth = inject(AuthService);
  private productService = inject(ProductService);
  private historyOrderService = inject(HistoryOrderService);

  private userId = this.auth.idUser;
  private orders = signal<Order[]>([]);

  
  listOrders(): Order[]{
    const userIdValue = this.userId();
    
    if (userIdValue === null) {
      this.message.add('Usuário não autenticado', 'error');
      return [];
    }
    
    this.historyOrderService.getOrdersByUser(userIdValue).subscribe({
      next: (orders) => {
        this.orders.set(orders);
        return orders;
      },
      error: (error) => {
        this.message.add('Erro ao buscar pedidos', 'error');
        return [];
      }
    });
    return this.orders();
  }


}
