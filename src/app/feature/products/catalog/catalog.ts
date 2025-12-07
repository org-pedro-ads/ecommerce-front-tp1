import { Component, computed, inject, signal } from '@angular/core';
import { Product } from '../../../models/product';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '../../../core/services/product/product.service';
import { Header } from "../../../core/header/header";
import { Footer } from "../../../core/footer/footer";
import { finalize } from 'rxjs';
import { CardProduct } from '../card-product/card-product';
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-catalog',
  imports: [Header, Footer, CardProduct, FormsModule, RouterLink],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
})
export class Catalog {

  private productService = inject(ProductService);
  
  loading = signal(true);
  categoriaSelecionada = signal<string | null>(null);
  ordenarPor = signal<string>('nome');

  private products = toSignal<Product[], Product[]>(this.productService.getProducts().pipe(
    finalize(() => this.loading.set(false))
  ), {
    initialValue: []
  });  
  
  listProducts = computed(() => {
    const categoria = this.categoriaSelecionada();
    const produtos = this.products();
    const ordenarPor = this.ordenarPor();

    // Ordenação
    let sortedProducts = [...produtos];
    if (ordenarPor === 'nome') {
      sortedProducts.sort((a, b) => a.nome.localeCompare(b.nome));
    } else if (ordenarPor === 'preco-menor') {
      sortedProducts.sort((a, b) => a.preco - b.preco);
    } else if (ordenarPor === 'preco-maior') {
      sortedProducts.sort((a, b) => b.preco - a.preco);
    }

    // Filtragem
    if (!categoria || categoria === 'all') {
      return sortedProducts.slice(0, 8);
    }
    return sortedProducts.filter(product => product.categoria === categoria).slice(0, 8);
  });
  
  listCategories = computed(() => {
    const produtos = this.products();
    const categories = produtos.map(product => product.categoria);
    return Array.from(new Set(categories));
  });
  
  onCategoriaChange(categoria: string) {
    this.categoriaSelecionada.set(categoria);
  }


}
