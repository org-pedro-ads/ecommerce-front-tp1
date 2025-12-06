import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {
  isLogin = true;

  formData = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'cliente' as 'admin' | 'operador' | 'cliente'
  };

  feedback: { type: 'success' | 'error', message: string } | null = null;

  constructor(private auth: AuthService) { }

  handleChange(field: string, value: string) {
    (this.formData as any)[field] = value;
  }

  handleSubmit() {
    if (this.isLogin) {
      if (!this.formData.email || !this.formData.password) {
        this.feedback = { type: 'error', message: 'Por favor, preencha email e senha.' };
        return;
      }

      const success = this.auth.login(this.formData.email, this.formData.password);

      if (success) {
        this.feedback = { type: 'success', message: 'Login realizado com sucesso!' };
      }
    } else {
      if (!this.formData.fullName || !this.formData.email || !this.formData.password || !this.formData.confirmPassword) {
        this.feedback = { type: 'error', message: 'Por favor, preencha todos os campos.' };
        return;
      }

      if (this.formData.password !== this.formData.confirmPassword) {
        this.feedback = { type: 'error', message: 'As senhas não coincidem.' };
        return;
      }

      if (this.formData.password.length < 6) {
        this.feedback = { type: 'error', message: 'A senha deve ter pelo menos 6 caracteres.' };
        return;
      }

      const success = this.auth.register({
        fullName: this.formData.fullName,
        email: this.formData.email,
        userType: this.formData.userType,
        password: this.formData.password
      });

      if (success) {
        this.feedback = { type: 'success', message: 'Cadastro realizado com sucesso!' };
      }
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
