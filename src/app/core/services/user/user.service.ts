import { inject, Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

}
