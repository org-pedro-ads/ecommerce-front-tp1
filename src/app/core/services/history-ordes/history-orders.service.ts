import { inject, Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';
import { HttpClient } from '@angular/common/http';
import { Order } from '../../../models/order';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HistoryOrderService {
  private logger = inject(LoggerService);
  private http = inject(HttpClient);

  private apiUrl = 'https://ecommerce-api-tp1.onrender.com/api/pedidos/usuario';

  getOrdersByUser(userId: number): Observable<Order[]> {
    this.logger.info(`[HistoryOrderService] getOrdersByUser - userId=${userId}`);

    return this.http.get<Order[]>(`${this.apiUrl}/${userId}/historico`).pipe(
      tap(orders => {
        this.logger.info(`[HistoryOrderService] getOrdersByUser - orders=${orders}`);
      }),
      catchError(error => {
        this.logger.error(
          '[HistoryOrderService] getOrdersByUser - Erro ao buscar pedidos',
          error
        );
        return of([]);
      })
    );
  }
}
