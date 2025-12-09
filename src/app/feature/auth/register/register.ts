import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from "@angular/router";
import { User } from '../../../models/user';
import { UserService } from '../../../core/services/user/user.service';
import { LoggerService } from '../../../core/services/logger/logger.service';
import { MessageService } from '../../../core/services/message/message.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, LucideAngularModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  
  private userService = inject(UserService);
  private logger = inject(LoggerService);
  private router = inject(Router);
  public messageService = inject(MessageService);

  enviando = signal(false);

  novoUsuario: User = {
    id: 0,
    nome: '',
    email: '',
    senha: '',
    admin: false
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.messageService.add('Por favor, preencha todos os campos obrigatórios corretamente.', 'error');
      return;
    }

    if (form.value.senha !== form.value.confirmacaoSenha) {
      this.logger.warn('[Register] onSubmit - As senhas não coincidem.');
      this.messageService.add('As senhas não coincidem. Por favor, tente novamente.', 'error');
      return;
    }

    if( form.value.senha.length < 6 ) {
      this.logger.warn('[Register] onSubmit - A senha é muito curta.');
      this.messageService.add('A senha deve ter pelo menos 6 caracteres.', 'error');
      return;
    }

    this.enviando.set(true);
    this.messageService.add('Registrando usuário...', 'info');

    const usuarioParaEnvio: User = {
      id: 0, // O ID será atribuído pelo backend
      nome: form.value.nome,
      email: form.value.email,
      senha: form.value.senha,
      admin: String(form.value.tipoUsuario) === 'true'
    };

    this.logger.info('[Register] onSubmit - Enviando dados:', usuarioParaEnvio);

    this.userService.postUser(usuarioParaEnvio).subscribe({
      next: (user) => {
        this.logger.info('[Register] Sucesso:', user);
        this.messageService.add('Usuário registrado com sucesso! Redirecionando...', 'success');
        
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        this.logger.error('[Register] Erro:', error);
        
        if (error.status === 409) {
           this.messageService.add('Este e-mail já está cadastrado.', 'error');
        } else {
           this.messageService.add('Erro ao registrar. Tente novamente mais tarde.', 'error');
        }
        
        this.enviando.set(false);
      }
    });
  }
}