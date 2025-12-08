import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-card-product',
  standalone: true, // Adicionado se for standalone
  imports: [LucideAngularModule],
  templateUrl: './card-product.html',
  styleUrl: './card-product.css',
})
export class CardProduct {

  @Input() produto: any = {
    nome: 'Produto Exemplo',
    categoria: 'Tecnologia',
    descricao: 'Uma descrição breve do produto para teste de layout.',
    preco: '99,90',
    quantidadeEstoque: 10,
    caracteristicas: ['Rápido', 'Durável', 'Econômico'],
  };
}