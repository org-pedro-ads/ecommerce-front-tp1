import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoggerService } from '../logger/logger.service';
import { catchError, map, Observable } from 'rxjs';
import { Product } from '../../../models/product';
import { ProductMapper } from '../../../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private logger = inject(LoggerService);
  private http = inject(HttpClient);

  private apiUrl = 'https://ecommerce-api-tp1.onrender.com/api/produtos';
  private idUsuario = '1';

  getProducts(): Observable<Product[]> {
    this.logger.info('[ProductService] getProdutos - Consumindo API de Produtos');
    return this.http.get<Product[]>(this.apiUrl).pipe(
      map((data: Product[]) => data.map(item => ProductMapper.fromJson(item))),
      catchError((error) => {
        this.logger.error('[ProductService] getProdutos - Erro ao consumir API de Produtos', error);
        return [];
      })
    );
  }
}