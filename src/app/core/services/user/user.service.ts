import { inject, Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { User } from '../../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  private logger = inject(LoggerService);
  private http = inject(HttpClient);

  private apiUrl = 'https://ecommerce-api-tp1.onrender.com/api/usuarios';
  
  postUser(user: User): Observable<User> {
    this.logger.info('[UserService] postUser - Enviando dados do usuário para a API');
    this.logger.info('[UserService] postUser - Dados do usuário:', user);
    return this.http.post<User>(this.apiUrl, user);
  }

  getUsers(): Observable<User[]> {
    this.logger.info('[UserService] getUsers - Buscando lista de usuários da API');
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<User> {
    this.logger.info(`[UserService] getUserById - Buscando usuário com ID: ${id}`);
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  updateUser(id: string, user: Partial<User>): Observable<User> {
    this.logger.info(`[UserService] updateUser - Atualizando usuário com ID: ${id}`);
    this.logger.info('[UserService] updateUser - Dados atualizados do usuário:', user);
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: string): Observable<void> {
    this.logger.info(`[UserService] deleteUser - Deletando usuário com ID: ${id}`);
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  login(email: string, senha: string): Observable<User | null> {
    return this.http.post<User>(`${this.apiUrl}/login`, { email, senha }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          return of(null); 
        }
        
        return throwError(() => new Error(`Erro no servidor: ${error.status}`));
      })
    );
  }
} 