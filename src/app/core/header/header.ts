import { Component, inject, signal, computed } from '@angular/core';
import { User } from '../../models/user';
import { Router, RouterLink } from "@angular/router";
import { ShoppingCart, LogOut, User as LucideUser, LucideAngularModule } from 'lucide-angular';
import { UserService } from '../services/user/user.service';
import { AuthService } from '../../feature/auth/services/auth.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { of, switchMap, Observable } from 'rxjs';
import { ShoppingCartService } from '../services/shopping-cart/shopping-cart.service';

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

  private userService = inject(UserService);
  private authService = inject(AuthService);
  private router = inject(Router);

  private idUser = this.authService.idUser

  readonly IconUser = LucideUser;
  readonly IconCart = ShoppingCart;
  readonly IconLogout = LogOut;

  constructor() {
    this.logoUrl = 'default-logo-url';
    this.nomeEcommerce = 'Default Ecommerce Name';
    this.descEcommerce = 'Default Ecommerce Description';
  }

  private idUser$ = toObservable(this.authService.idUser);
  private cartService = inject(ShoppingCartService);
  private cart$ = this.cartService.cart;
  private qtdeCart = computed(() => this.cart$()?.itens.length || 0);

  private userData = toSignal(
    this.idUser$.pipe(
      switchMap((id): Observable<User | null> => {
        if (id !== null) {
          return this.userService.getUserById(id);
        }
        return of(null);
      })
    )
  );

  public user = this.userService.user;

  public userName = computed(() => {
    return this.user() ? this.user()!.nome : "Fazer login";
  });

  userButtonClick() {
    if (this.idUser() === null) {
      this.router.navigate(['']);
    } else {
      this.router.navigate(['/user/edit']);
    }
  }

  logout() {
    this.authService.idUser.set(null);
    this.router.navigate(['/']);
  }

  getQtdeCart() {
    return this.qtdeCart();
  }
}