import { inject, Injectable, signal } from '@angular/core';
import { UserService } from '../../../core/services/user/user.service';
import { User } from '../../../models/user';
import { MessageService } from '../../../core/services/message/message.service';
import { LoggerService } from '../../../core/services/logger/logger.service';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private userService = inject(UserService);
  private messageService = inject(MessageService);
  private logger = inject(LoggerService);

  idUser = signal<number | null>(null);
  isAdmin = signal<boolean>(false);

  login(email: string, password: string): Observable<boolean> {
    return this.userService.login(email, password).pipe(

      tap(user => {
        if (user) {
          this.logger.info('[AuthService] login - Sucesso! ID:', user.id);
          this.idUser.set(user.id);
          this.isAdmin.set(user.admin);
          this.userService.user.set(user);
        } else {
          this.logger.warn('[AuthService] login - Falha no login para o email:', email);
          this.idUser.set(null);
          this.userService.user.set(null);
          this.isAdmin.set(false);
        }
      }),

      map(user => !!user)
    );
  }
}