import { Component } from '@angular/core';

@Component({
  selector: 'app-history-orders',
  imports: [],
  templateUrl: './history-orders.html',
  styleUrl: './history-orders.css',
})
export class HistoryOrders {
  searchTerm = '';
  filterStatus = 'all';
  selectedOrder: any = null;

  orders = []; // carregar da API

  get filteredOrders() {
    return this.orders.filter(order => {
      const matchesSearch =
        order.orderNumber.includes(this.searchTerm) ||
        order.status.includes(this.searchTerm);

      const matchesStatus =
        this.filterStatus === 'all' ||
        order.status === this.filterStatus;

      return matchesSearch && matchesStatus;
    });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('pt-BR');
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Pago':
        return 'border-green-500 text-green-600';
      case 'Pendente':
        return 'border-yellow-500 text-yellow-600';
      case 'Cancelado':
        return 'border-red-500 text-red-600';
      default:
        return '';
    }
  }

  selectOrder(order: any) {
    this.selectedOrder = order;
  }

  closeModal() {
    this.selectedOrder = null;
  }
}
