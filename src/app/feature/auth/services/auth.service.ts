import { inject, Injectable, signal } from '@angular/core';
import { UserService } from '../../../core/services/user/user.service';
import { MessageService } from '../../../core/services/message/message.service';
import { LoggerService } from '../../../core/services/logger/logger.service';
import { map, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private userService = inject(UserService);
  private messageService = inject(MessageService);
  private logger = inject(LoggerService);
  private router = inject(Router);

  idUser = signal<number | null>(null);
  isAdmin = signal<boolean>(false);

  constructor() {
    // Ao iniciar o serviço (app load), tenta recuperar o cookie
    this.verificarCookieId();
  }

  login(email: string, password: string): Observable<boolean> {
    return this.userService.login(email, password).pipe(
      tap(user => {
        if (user) {
          this.logger.info('[AuthService] login - Sucesso! ID:', user.id);
          
          // 1. Atualiza os Signals
          this.idUser.set(user.id);
          this.isAdmin.set(user.admin);
          this.userService.user.set(user);
          
          // 2. Salva no Cookie (Ex: expira em 1 dia)
          this.setCookie('idUser', user.id.toString(), 1);
          
          // Opcional: Salvar flag de admin se quiser persistir isso também
          // this.setCookie('isAdmin', String(user.admin), 1);
        } else {
          this.logger.warn('[AuthService] login - Falha no login para o email:', email);
          this.logout();
        }
      }),
      map(user => !!user)
    );
  }

  logout() {
    this.idUser.set(null);
    this.userService.user.set(null);
    this.isAdmin.set(false);
    this.deleteCookie('idUser'); // Remove o cookie
    this.router.navigate(['/login']);
  }

  // --- Lógica de Recuperação ---

  private verificarCookieId() {
    const storedId = this.getCookie('idUser');
    
    if (storedId) {
      const id = Number(storedId);
      this.logger.info('[AuthService] Sessão restaurada via Cookie. ID:', id);
      this.idUser.set(id);
      
      // IMPORTANTE: Aqui você tem o ID, mas não os dados completos (nome, email, admin).
      // O ideal seria chamar o userService para buscar os dados pelo ID agora.
      // Exemplo: 
      // this.userService.getById(id).subscribe(u => { this.userService.user.set(u); this.isAdmin.set(u.admin) });
    }
  }

  // --- Helpers de Cookie (JavaScript Nativo) ---

  private setCookie(name: string, value: string, days: number) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    // path=/ garante que o cookie funcione em todas as rotas
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  private getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  private deleteCookie(name: string) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
}