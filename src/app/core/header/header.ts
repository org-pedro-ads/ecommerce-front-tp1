import { Component } from '@angular/core';
import { User } from '../../models/user';
import { RouterLink } from "@angular/router";
import { ShoppingCart, LogOut, User as LucideUser, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    LucideAngularModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  logoUrl: string;
  nomeEcommerce: string;
  descEcommerce: string;
  user: User;

  readonly IconUser = LucideUser; 
  readonly IconCart = ShoppingCart;
  readonly IconLogout = LogOut;
  
  constructor() {
    this.logoUrl = 'default-logo-url';
    this.nomeEcommerce = 'Default Ecommerce Name';
    this.descEcommerce = 'Default Ecommerce Description';
    this.user = new User();
  }

  // Fazer logica de deslogar ao clicar em sair

}
