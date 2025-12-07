import { inject, Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';
import { HttpClient } from '@angular/common/http';
import { Order, OrderMapper } from '../../../models/order';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private logger = inject(LoggerService);
  private http = inject(HttpClient);

  private apiUrl = 'https://ecommerce-api-tp1.onrender.com/api/carrinho';

  getCartByUser(userId: number): Observable<Order | null> {
    this.logger.info(`[ShoppingCartService] getCartByUser - userId=${userId}`);
  
    return this.http
      .get<any>(`${this.apiUrl}/${userId}`)
      .pipe(
        map(data => OrderMapper.fromJson(data)),
        catchError(error => {
          this.logger.error(
            '[ShoppingCartService] getCartByUser - Erro ao buscar carrinho',
            error
          );
          return of(null);
        })
      );
  }

  updateItem(itemId: number, quantity: number): Observable<void> {
    this.logger.info(`[CartService] updateItem - itemId=${itemId}`);
  
    return this.http
      .put<void>(`${this.apiUrl}/itens/${itemId}`, { quantidade: quantity })
      .pipe(
        catchError(error => {
          this.logger.error(
            '[CartService] updateItem - Erro ao atualizar item',
            error
          );
          return of(void 0);
        })
      );
  }
  
  removeItem(itemId: number): Observable<void> {
    this.logger.info(`[CartService] removeItem - itemId=${itemId}`);
  
    return this.http
      .delete<void>(`${this.apiUrl}/itens/${itemId}`)
      .pipe(
        catchError(error => {
          this.logger.error(
            '[CartService] removeItem - Erro ao remover item',
            error
          );
          return of(void 0);
        })
      );
  }
  checkout(userId: number): Observable<void> {
    this.logger.info(`[CartService] checkout - userId=${userId}`);
  
    return this.http
      .post<void>(`${this.apiUrl}/checkout/${userId}`, {})
      .pipe(
        catchError(error => {
          this.logger.error(
            '[CartService] checkout - Erro ao finalizar pedido',
            error
          );
          return of(void 0);
        })
      );
  }
  
}
