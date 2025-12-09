import { Component, inject, signal } from '@angular/core';
import { User } from '../../../models/user';
import { AuthService } from '../../auth/services/auth.service';
import { UserService } from '../../../core/services/user/user.service';
import { MessageService } from '../../../core/services/message/message.service';
import { LucideAngularModule } from 'lucide-angular';
import { LoggerService } from '../../../core/services/logger/logger.service';
import { Header } from "../../../core/header/header";
import { Footer } from "../../../core/footer/footer";
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  imports: [LucideAngularModule, Header, Footer, ReactiveFormsModule],
  templateUrl: './edit-user.html',
  styleUrl: './edit-user.css',
})

export class EditUser {

  private auth = inject(AuthService);
  private userService = inject(UserService);
  private messageService = inject(MessageService);
  private fb = inject(FormBuilder);
  private logger = inject(LoggerService);

  private idDoUsuario?: number | null;
  private user: User | null = null;
  private isLoading = signal(false);
  private editando = signal(false);
  private router = inject(Router);

  form: FormGroup = this.fb.nonNullable.group({
    nome: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor() {
    this.idDoUsuario = this.auth.idUser();

    if (this.idDoUsuario == null) {
      this.messageService.add('Usuário não autenticado.', 'error');
      this.router.navigate(['/login']);
      return
    }
    this.isLoading.set(true);

    this.userService.getUserById(this.idDoUsuario).subscribe({
      next: (user) => {
        this.isLoading.set(false);
        this.userService.user.set(user);
        this.user = user;

        this.form.patchValue({
          nome: user.nome,
          email: user.email
        });

        this.form.disable();

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

    if (this.editando()) {
      this.form.enable();
    } else {
      this.form.disable();
    }

    return this.editando();
  }

  editarUsuario(): void {
    if (this.form.invalid || this.idDoUsuario == null) return;

    this.isLoading.set(true);

    const payload: User = {
      ...this.user!,
      nome: this.form.value.nome!,
      email: this.form.value.email!,
    };

    if (this.user == null || this.idDoUsuario == null) {
      this.messageService.add('Nenhum usuário para editar.', 'error');
      return;
    }

    this.userService.updateUser(this.idDoUsuario!, payload).subscribe({
      next: (updatedUser) => {
        this.userService.user.set(updatedUser);
        this.user = updatedUser;
        this.messageService.add('Usuário atualizado com sucesso.', 'success');
        this.isLoading.set(false);
        this.editando.set(false);
        this.form.disable();
      },
      error: (error) => {
        this.messageService.add('Erro ao atualizar usuário.', 'error');
        this.isLoading.set(false);
        this.editando.set(false);
      }
    });
  }
}
