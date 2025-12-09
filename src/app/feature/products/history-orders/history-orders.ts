import { Component, inject, signal, OnInit, ViewChild } from '@angular/core'; // Adicione OnInit
import { Header } from '../../../core/header/header'
import { Footer } from '../../../core/footer/footer';
import { LucideAngularModule, Route } from 'lucide-angular';
import { DatePipe } from '@angular/common';
import { MessageService } from '../../../core/services/message/message.service';
import { AuthService } from '../../auth/services/auth.service';
import { HistoryOrderService } from '../../../core/services/history-ordes/history-orders.service';
import { Order } from '../../../models/order';
import { Router } from '@angular/router';
import { ModalHistoryOrder } from '../modal-history-order/modal-history-order';
import { SidebarComponent } from "../../sidebar/sidebar";

@Component({
  selector: 'app-history-orders',
  imports: [Header, Footer, LucideAngularModule, DatePipe, ModalHistoryOrder, SidebarComponent],
  templateUrl: './history-orders.html',
  styleUrl: './history-orders.css',
})
export class HistoryOrders implements OnInit {

  @ViewChild(ModalHistoryOrder) modal!: ModalHistoryOrder;

  private message = inject(MessageService);
  private auth = inject(AuthService);
  private historyOrderService = inject(HistoryOrderService);
  private route = inject(Router);

  private userId = this.auth.idUser;
  protected orders = signal<Order[]>([]);
  protected filteredOrders = signal<Order[]>([]);
  protected isLoading = signal<boolean>(true);

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
        this.filteredOrders.set(data);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.message.add('Erro ao buscar pedidos', 'error');
        console.error(error);
        this.isLoading.set(false);
      }
    });
  }
  
  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'pago': return 'status-paid';
      case 'pendente': return 'status-pending';
      case 'cancelado': return 'status-cancelled';
      default: return 'status-default';
    }
  }

  filtrarPedidosStatus(event: Event) {
    this.isLoading.set(true);

    const status = (event.target as HTMLSelectElement).value;
    const todos = this.orders();

    if (status === 'todos' || status === '') {
      this.isLoading.set(false);
      this.filteredOrders.set(todos);
    } else {
      const filtrados = todos.filter(order => order.status.toLowerCase() === status.toLowerCase());
      this.isLoading.set(false);
      this.filteredOrders.set(filtrados);
    }
  }

  filtrarPedidosBarraPesquisa(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    const todos = this.orders();

    if (query === '') {
      this.filteredOrders.set(todos);
    } else {
      const filtrados = todos.filter(order => 
        order.id.toString().includes(query) ||
        order.dataPedido.toString().toLowerCase().includes(query)
      );
      this.filteredOrders.set(filtrados);
    }
  }

  abrirModalDetalhes(order: Order) {
    if (this.modal) {
      this.modal.setOrder = order;
      this.modal.openModal();
    }
  }
}