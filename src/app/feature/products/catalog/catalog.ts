import { Component, computed, inject, signal } from '@angular/core';
import { Product } from '../../../models/product';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '../../../core/services/product/product.service';
import { Header } from "../../../core/header/header";
import { Footer } from "../../../core/footer/footer";
import { SidebarComponent } from '../../sidebar/sidebar';
import { finalize } from 'rxjs';
import { CardProduct } from '../card-product/card-product';
import { FormsModule } from "@angular/forms";
import { ProductModalComponent } from '../product-modal/product-modal';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-catalog',
  standalone: true,
  // Adicione SidebarComponent nos imports
  imports: [Header, Footer, SidebarComponent, CardProduct, FormsModule, ProductModalComponent, LucideAngularModule],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
})
export class Catalog {

  private productService = inject(ProductService);
  // Router e AuthService removidos daqui pois agora estão dentro do SidebarComponent
  // (a menos que você precise deles para outra coisa no catálogo)
  
  loading = signal(true);
  categoriaSelecionada = signal<string | null>(null);
  ordenarPor = signal<string>('nome');
  termoBusca = signal<string>(''); 
  produtoSelecionado: Product | null = null;

  private products = toSignal<Product[], Product[]>(this.productService.getProducts().pipe(
    finalize(() => this.loading.set(false))
  ), {
    initialValue: []
  });  
  
  // ... (listProducts, listCategories, onCategoriaChange, onBuscaChange permanecem iguais)
  listProducts = computed(() => {
     // ... sua lógica original ...
     const categoria = this.categoriaSelecionada();
     const produtos = this.products();
     const ordenarPor = this.ordenarPor();
     const busca = this.termoBusca().toLowerCase().trim();
 
     let filteredProducts = [...produtos];
 
     if (busca) {
       filteredProducts = filteredProducts.filter(product => 
         product.nome.toLowerCase().includes(busca)
       );
     }
 
     if (categoria && categoria !== 'all') {
       filteredProducts = filteredProducts.filter(product => 
         product.categoria === categoria
       );
     }
 
     if (ordenarPor === 'nome') {
       filteredProducts.sort((a, b) => a.nome.localeCompare(b.nome));
     } else if (ordenarPor === 'preco-menor') {
       filteredProducts.sort((a, b) => a.preco - b.preco);
     } else if (ordenarPor === 'preco-maior') {
       filteredProducts.sort((a, b) => b.preco - a.preco);
     }
 
     return filteredProducts.slice(0, 8);
  });

  listCategories = computed(() => {
    const produtos = this.products();
    const categories = produtos.map(product => product.categoria);
    return Array.from(new Set(categories));
  });

  onCategoriaChange(categoria: string) {
    this.categoriaSelecionada.set(categoria);
  }

  onBuscaChange(termo: string) {
    this.termoBusca.set(termo);
  }

  limparFiltros() {
    this.termoBusca.set('');
    this.categoriaSelecionada.set(null);
    this.ordenarPor.set('nome');
  }

  // Métodos onClickMeuPerfil e isAdmin foram removidos daqui pois estão na Sidebar

  abrirModal(produto: any) {
    this.produtoSelecionado = produto;
    document.body.style.overflow = 'hidden'; 
  }

  fecharModal() {
    this.produtoSelecionado = null;
    document.body.style.overflow = 'auto';
  }
}