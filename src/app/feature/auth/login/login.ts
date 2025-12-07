import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from '../../../core/services/message/message.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {
  private messageService = inject(MessageService);
  private auth = inject(AuthService);
  private router = inject(Router);

  loading = signal(false);

  isLogin = true;

  formData = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'cliente' as 'admin' | 'operador' | 'cliente'
  };

  feedback: { type: 'success' | 'error', message: string } | null = null;

  handleChange(field: string, value: string) {
    (this.formData as any)[field] = value;
  }

  handleSubmit() {
    if (!this.formData.email || !this.formData.password) {
      this.messageService.add('Por favor, preencha email e senha.', 'error');
      return;
    }

    if (this.isLogin) {
      this.auth.login(this.formData.email, this.formData.password)
        .subscribe({
          next: (isLoggedIn) => {
            if (isLoggedIn) {
              this.messageService.add('Login realizado com sucesso!', 'success');
              this.router.navigate(['/']); 
            }
          },
          error: (err) => {
            console.error('Erro no login', err);
            this.messageService.add('Erro ao tentar fazer login.', 'error');
          }
        });

    } else {
      // this.handleRegister();
    }
  }

  handleCancel() {
    this.formData = {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      userType: 'cliente'
    };

    this.feedback = null;
  }

  toggleMode() {
    this.isLogin = !this.isLogin;
    this.handleCancel();
  }
}