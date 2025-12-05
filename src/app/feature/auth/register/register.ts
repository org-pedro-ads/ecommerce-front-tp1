import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Header } from "../../../core/header/header"
import { Footer } from "../../../core/footer/footer";
import { CommonModule } from '@angular/common';
import { User, tipoUsuarioEnum } from '../../../models/user'

@Component({
  selector: 'app-register',
  imports: [Header, Footer,CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registrationForm: any;


  novoUsuario: User = {
    nome: '',
    email: '',
    senha: '',
    tipoUsuario: tipoUsuarioEnum.Cliente
  }


  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form Data: ', form.value);
    } else {
      console.log('Form is invalid');
    } 
  }
}
