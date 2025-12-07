import { Component, inject, signal } from '@angular/core';
import { User } from '../../../models/user';
import { AuthService } from '../../auth/services/auth.service';
import { UserService } from '../../../core/services/user/user.service';
import { MessageService } from '../../../core/services/message/message.service';
import { LucideAngularModule } from 'lucide-angular';
import { LoggerService } from '../../../core/services/logger/logger.service';
import { Header } from "../../../core/header/header";
import { Footer } from "../../../core/footer/footer";

@Component({
  selector: 'app-edit-user',
  imports: [LucideAngularModule, Header, Footer],
  templateUrl: './edit-user.html',
  styleUrl: './edit-user.css',
})

export class EditUser {

  private auth = inject(AuthService);
  private userService = inject(UserService);
  private messageService = inject(MessageService);
  private logger = inject(LoggerService);

  private idDoUsuario: number;
  private user: User | null = null;
  private isLoading = signal(false);
  private editando = signal(false);

  constructor() {
    this.idDoUsuario = 2 //this.auth.idUser(); Desativado temporariamente para testes

    if (this.idDoUsuario == null) {
      this.messageService.add('Usuário não autenticado.', 'error');
      return;
    }
    this.isLoading.set(true);
    
    this.userService.getUserById(this.idDoUsuario).subscribe({
      next: (user) => {
        this.isLoading.set(false);
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

  podeEditar(): boolean {
    return this.editando();
  }

  getIsLoading(): boolean {
    return this.isLoading();
  }

  liberarEdicao(): boolean {
    this.editando.set(!this.editando());
    return this.editando();
  }

  editarUsuario(): void {
    this.isLoading.set(true);
    if (this.user == null || this.idDoUsuario == null) {
      this.messageService.add('Nenhum usuário para editar.', 'error');
      return;
    }
    
    this.userService.updateUser(this.idDoUsuario!, this.user).subscribe({
      next: (updatedUser) => {
        this.user = updatedUser;
        this.messageService.add('Usuário atualizado com sucesso.', 'success');
        this.logger.info('[EditUser] Usuário atualizado:', this.user);
        this.isLoading.set(false);
        this.editando.set(false);
      },
      error: (error) => {
        this.messageService.add('Erro ao atualizar usuário.', 'error');
        this.isLoading.set(false);
        this.editando.set(false);
      }
    });
  }
}
