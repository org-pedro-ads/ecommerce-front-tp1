import { Component, inject, signal, OnInit } from '@angular/core'; // Adicione OnInit
import { Header } from '../../../core/header/header'
import { Footer } from '../../../core/footer/footer';
import { LucideAngularModule, Route } from 'lucide-angular';
import { DatePipe } from '@angular/common';
import { MessageService } from '../../../core/services/message/message.service';
import { AuthService } from '../../auth/services/auth.service';
import { HistoryOrderService } from '../../../core/services/history-ordes/history-orders.service';
import { Order } from '../../../models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history-orders',
  imports: [Header, Footer, LucideAngularModule, DatePipe],
  templateUrl: './history-orders.html',
  styleUrl: './history-orders.css',
})
export class HistoryOrders implements OnInit {

  private message = inject(MessageService);
  private auth = inject(AuthService);
  private historyOrderService = inject(HistoryOrderService);
  private route = inject(Router);

  private userId = this.auth.idUser;
  protected orders = signal<Order[]>([]);

  ngOnInit(): void {
    this.carregarPedidos();
  }
  
  carregarPedidos() {
    const userIdValue = this.userId();
    
    if (userIdValue === null) {
      this.message.add('Usuário não autenticado', 'error');
      this.route.navigate(['/login']);
      return;
    }
    
    this.historyOrderService.getOrdersByUser(userIdValue).subscribe({
      next: (data) => {
        this.orders.set(data);
      },
      error: (error) => {
        this.message.add('Erro ao buscar pedidos', 'error');
        console.error(error);
      }
    });
  }
  
  // Helper para definir a classe CSS do status (opcional, ou fazer no HTML)
  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'pago': return 'status-paid';
      case 'pendente': return 'status-pending';
      case 'cancelado': return 'status-cancelled';
      default: return 'status-default';
    }
  }
}