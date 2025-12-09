import { Component, inject } from '@angular/core';
import { Header } from "../../../core/header/header";
import { Footer } from "../../../core/footer/footer";
import { ProductsService, Produto } from '../products.service';
import { Router, RouterLink } from '@angular/router';
import { DecimalPipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from "../../sidebar/sidebar";

@Component({
  selector: 'app-list-products',
  imports: [Header, Footer, DecimalPipe, FormsModule, RouterLink, SidebarComponent],
  templateUrl: './list-products.html',
  styleUrl: './list-products.css',
})

export class ListProducts {
  private produtosService = inject(ProductsService);
  private router = inject(Router);

  products: Produto[] = [];

  ngOnInit(): void {
    this.produtosService.listar().subscribe({
      next: (dados) => (this.products = dados),
      error: (err) => console.error(err),
    });
  }

  edit(id: number) {
    this.router.navigate(['/products/product-management/edit-products', id]);
  }

  remove(id: number) {
    if (confirm('Tem certeza que deseja remover este produto?')) {
      this.produtosService.remover(id).subscribe({
        next: () => {
          this.products = this.products.filter(p => p.id !== id);
          console.log('Produto removido com sucesso');
        },
        error: (err) => {
          console.error('Erro ao remover produto:', err);
        }
      });
    }
  }
}
