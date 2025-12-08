import { Component, EventEmitter, Output, Input, signal, SimpleChanges } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './product-modal.html',
  styleUrl: './product-modal.css'
})
export class ProductModalComponent {

  
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
}