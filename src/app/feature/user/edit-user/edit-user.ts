import { Component, inject, signal } from '@angular/core';
import { User } from '../../../models/user';
import { AuthService } from '../../auth/services/auth.service';
import { UserService } from '../../../core/services/user/user.service';
import { MessageService } from '../../../core/services/message/message.service';
import { Router } from 'lucide-angular';
import { Observable } from 'rxjs';
import { LoggerService } from '../../../core/services/logger/logger.service';

@Component({
  selector: 'app-edit-user',
  imports: [],
  templateUrl: './edit-user.html',
  styleUrl: './edit-user.css',
})

export class EditUser {

  private auth = inject(AuthService);
  private userService = inject(UserService);
  private messageService = inject(MessageService);
  private logger = inject(LoggerService);

  private idDoUsuario: number | null;

  private user: User | null = null;

  constructor() {
    this.idDoUsuario = this.auth.idUser(); 

    if (this.idDoUsuario == null) {
      this.messageService.add('Usuário não autenticado.', 'error');
      return;
    }
    
    this.userService.getUserById(this.idDoUsuario).subscribe({
      next: (user) => {
        this.user = user;
        this.logger.info('[EditUser] Dados do usuário carregados:', this.user);
      },
      error: (error) => {
        this.messageService.add('Erro ao carregar dados do usuário.', 'error');
      }
    });
  }

  getUser(): User | null {
    return this.user;
  }
}
