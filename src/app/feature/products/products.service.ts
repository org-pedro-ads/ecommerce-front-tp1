import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Produto {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  quantidadeEstoque: number;
  descricao: string;
  caracteristicas: string[];
}

@Injectable({
  providedIn: 'root',
})

export class ProductsService {
  private readonly apiUrl = 'http://localhost:8080/api/produtos'
  private http = inject(HttpClient)

  private products: Produto[] = []

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }

  cadastrar(produto: Partial<Produto>): Observable<Produto> {
    console.log('>>>>>>>>>>>>>>>', produto)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Produto>(this.apiUrl, JSON.stringify(produto), { headers });
  }

  buscarPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/${id}`);
  }

  atualizar(id: number, produto: Partial<Produto>): Observable<Produto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Produto>(`${this.apiUrl}/${id}`, produto, { headers });
  }

  remover(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
