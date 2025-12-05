import { Component } from '@angular/core';
import { User } from '../../app/user/user';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  logoUrl: string;
  nomeEcommerce: string;
  descEcommerce: string;
  user: User;
  
  constructor() {
    this.logoUrl = 'default-logo-url';
    this.nomeEcommerce = 'Default Ecommerce Name';
    this.descEcommerce = 'Default Ecommerce Description';
    this.user = new User();
  }
}
