import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-product',
  imports: [],
  templateUrl: './card-product.html',
  styleUrl: './card-product.css',
})
export class CardProduct {

  @Input() produto: any = {
    nome: 'Nome do Produto',
    categoria: 'Geral',
    descricao: 'Descrição do produto...',
    preco: '0,00',
    avaliacoes: 0
  };

}