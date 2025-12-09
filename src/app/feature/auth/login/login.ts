import { CommonModule } from '@angular/common';
import { Component, inject, signal, OnInit } from '@angular/core'; // Adicione OnInit
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from '../../../core/services/message/message.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-login',
  standalone: true, // Assumindo que é standalone pelo imports
  imports: [CommonModule, FormsModule, RouterLink, LucideAngularModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit { // Implemente OnInit
  
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

  // Verificação ao iniciar o componente
  ngOnInit(): void {
    // Se o AuthService já recuperou o ID do cookie no construtor dele,
    // o idUser() será diferente de null.
    if (this.auth.idUser()) {
      console.log('Usuário já logado via cookie, redirecionando...');
      this.router.navigate(['/products']);
    }
  }

  handleChange(field: string, value: string) {
    (this.formData as any)[field] = value;
  }

  handleSubmit() {
    if (!this.formData.email || !this.formData.password) {
      this.messageService.add('Por favor, preencha email e senha.', 'error');
      return;
    }

    if (this.isLogin) {
      this.loading.set(true); // Trava o botão
      this.messageService.add("Tentando logar...", "info");
      
      this.auth.login(this.formData.email, this.formData.password)
        .subscribe({
          next: (isLoggedIn) => {
            if (isLoggedIn) {
              this.messageService.add('Login realizado com sucesso!', 'success');
              // O cookie já foi salvo dentro do auth.login via 'tap'
              this.router.navigate(['/products']); 
            } else {
               // Caso o login retorne false (usuário não encontrado)
               this.loading.set(false);
            }
          },
          error: (err) => {
            console.error('Erro no login', err);
            this.messageService.add('Email ou senha incorretos.', 'error');
            this.loading.set(false); // Destrava o botão em caso de erro
          }
        });

    } else {
      // Lógica de registro...
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
  }

  toggleMode() {
    this.isLogin = !this.isLogin;
    this.handleCancel();
  }
}