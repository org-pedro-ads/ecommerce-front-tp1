import { Component, inject } from '@angular/core';
import { Header } from "../../../core/header/header";
import { Footer } from "../../../core/footer/footer";
import { ProductsService } from '../products.service';
import { Router, RouterLink } from '@angular/router';
import { DecimalPipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-products',
  imports: [Header, Footer, DecimalPipe, FormsModule, RouterLink],
  templateUrl: './list-products.html',
  styleUrl: './list-products.css',
})

export class ListProducts {
  private produtosService = inject(ProductsService);
  private router = inject(Router);

  products = this.produtosService.listar();

  edit(id: number) {
    this.router.navigate(['/edit-products', id]);
  }

  remove(id: number) {
    if (confirm('Tem certeza que deseja remover este produto?')) {
      this.produtosService.remover(id);
      this.products = this.produtosService.listar();
    }
  }
}
