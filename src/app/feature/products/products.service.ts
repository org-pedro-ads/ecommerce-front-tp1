import { Injectable } from '@angular/core';

export interface Produto {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  estoque: number;
  descricao: string;
  caracteristicas: string[];
}

@Injectable({
  providedIn: 'root',
})

export class ProductsService {
  private produtos: Produto[] = [
    {
      id: 1,
      nome: "Notebook Dell Inspiron 15",
      categoria: "Eletrônicos",
      preco: 3499.90,
      estoque: 15,
      descricao: "Notebook Dell Inspiron 15...",
      caracteristicas: ["Intel Core i5", "8GB RAM", "256GB SSD"]
    },
    {
      id: 2,
      nome: "Mouse Logitech MX Master 3",
      categoria: "Eletrônicos",
      preco: 389.90,
      estoque: 45,
      descricao: "Mouse profissional Logitech...",
      caracteristicas: ["Bluetooth", "Silencioso"]
    }
  ];

  listar() {
    return this.produtos;
  }

  buscarPorId(id: number) {
    return this.produtos.find(p => p.id === id)!;
  }

  atualizar(id: number, produto: Produto) {
    const index = this.produtos.findIndex(p => p.id === id);
    this.produtos[index] = produto;
  }

  remover(id: number) {
    this.produtos = this.produtos.filter(p => p.id !== id);
  }
}
