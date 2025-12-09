import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necessário para pipes (date, currency)
import { LucideAngularModule } from 'lucide-angular';
import { Order } from '../../../models/order';

@Component({
  selector: 'app-modal-history-order',
  standalone: true,
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './modal-history-order.html',
  styleUrl: './modal-history-order.css',
})
export class ModalHistoryOrder {

  private isOpen: boolean = false;
  // Alterei para public/protected para ser acessível no HTML
  protected order: Order | null = null; 

  // Método para definir o pedido ao abrir
  set setOrder(order: Order) {
    this.order = order;
  }

  get getOrder(): Order | null {
    return this.order;
  }

  get modalIsOpen(): boolean {
    return this.isOpen;
  }

  openModal() {
    this.isOpen = true;
    // Bloqueia o scroll do fundo da página
    document.body.style.overflow = 'hidden'; 
  }

  closeModal() {
    this.isOpen = false;
    this.order = null;
    // Libera o scroll
    document.body.style.overflow = 'auto'; 
  }

  // Método auxiliar para classes CSS do status (igual ao da listagem)
  getStatusClass(status: string | undefined): string {
    if (!status) return 'status-default';
    switch (status.toLowerCase()) {
      case 'pago': return 'status-paid';
      case 'pendente': return 'status-pending';
      case 'cancelado': return 'status-cancelled';
      default: return 'status-default';
    }
  }
}