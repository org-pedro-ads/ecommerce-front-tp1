import { Component, Input } from '@angular/core';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-card-product',
  imports: [],
  templateUrl: './card-product.html',
  styleUrl: './card-product.css',
})
export class CardProduct {

  @Input() product: Product = {
    id: 0,
    nome: '',
    descricao: '',
    preco: 0,
    quantidadeEstoque: 0,
    categoria: 'ELETRONICOS',
  };

  adicionarAoCarrinho() {
    console.log('Adicionado ao carrinho:', this.product.nome);
  }

}
