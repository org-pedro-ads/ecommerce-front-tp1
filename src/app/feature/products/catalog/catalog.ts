import { Component, computed, inject, signal } from '@angular/core';
import { Product } from '../../../models/product';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '../../../core/services/product/product.service';
import { Header } from "../../../core/header/header";
import { Footer } from "../../../core/footer/footer";
import { finalize } from 'rxjs';

@Component({
  selector: 'app-catalog',
  imports: [Header, Footer],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
})
export class Catalog {

  private productService = inject(ProductService);
  loading = signal(true);

  private products = toSignal<Product[], Product[]>(this.productService.getProducts().pipe(
    finalize(() => this.loading.set(false))
  ), {
    initialValue: []
  });  

  listProducts = computed(() => {
    const produtos = this.products();
    return produtos.slice(0, 8);
  });

}
