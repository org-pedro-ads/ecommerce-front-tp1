import { inject, Injectable, signal } from '@angular/core';
import { LoggerService } from '../logger/logger.service';
import { HttpClient } from '@angular/common/http';
import { Order, OrderMapper } from '../../../models/order';
import { catchError, EMPTY, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private logger = inject(LoggerService);
  private http = inject(HttpClient);

  private apiUrl = 'https://ecommerce-api-tp1.onrender.com/api/carrinho';

  private _cart = signal<Order | null>(null);

  readonly cart = this._cart.asReadonly();

  getCartByUser(userId: number): Observable<Order | null> {
    this.logger.info(`[ShoppingCartService] getCartByUser - userId=${userId}`);

    return this.http
      .get<any>(`${this.apiUrl}/${userId}`)
      .pipe(
        map(data => OrderMapper.fromJson(data)),
        tap(cart => {
          this._cart.set(cart); 
        }),
        catchError(error => {
          this.logger.error(
            '[ShoppingCartService] getCartByUser - Erro ao buscar carrinho',
            error
          );
          this._cart.set(null);
          return of(null);
        })
      );
  }

  addOrUpdateItem(
    userId: number,
    produtoId: number,
    quantidade: number
  ): Observable<Order | null> {
    this.logger.info(
      `[ShoppingCartService] addOrUpdateItem - userId=${userId}, produtoId=${produtoId}`
    );

    return this.http
      .post<any>(`${this.apiUrl}/${userId}/itens`, {
        produtoId,
        quantidade
      })
      .pipe(
        map(data => OrderMapper.fromJson(data)),
        tap(cart => {
          this._cart.set(cart);
        }),
        catchError(error => {
          this.logger.error(
            '[ShoppingCartService] addOrUpdateItem - Erro',
            error
          );
          return of(this._cart());
        })
      );
  }
  
  removeItem(itemId: number): Observable<void> {
  return this.http
    .delete<void>(`${this.apiUrl}/itens/${itemId}`)
    .pipe(
      tap(() => {
        const cart = this._cart();
        if (!cart) return;

        this._cart.set({
          ...cart,
          itens: cart.itens.filter(i => i.id !== itemId)
        });
      }),
      catchError(error => {
        this.logger.error('[CartService] Erro ao remover item', error);

        return EMPTY;
      })
    );
  }

  checkout(userId: number): Observable<void> {
  this.logger.info(`[CartService] checkout - userId=${userId}`);

  return this.http
    .post<void>(`${this.apiUrl}/${userId}/finalizar`, {})
    .pipe(
      tap(() => {
        this._cart.set(null);
      }),
      catchError(error => {
        this.logger.error(
          '[CartService] checkout - Erro ao finalizar pedido',
          error
        );

        return EMPTY;
      })
    );
  }
}
