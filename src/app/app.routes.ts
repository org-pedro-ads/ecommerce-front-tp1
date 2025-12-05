import { Routes } from '@angular/router';
import { ListProducts } from './feature/products/list-products/list-products';
import { InvalidPage } from './feature/invalid-page/invalid-page';
import { Login } from './feature/auth/login/login';
import { Register } from './feature/auth/register/register';

export const routes: Routes = [
    {path: '', component: ListProducts},
    {path: 'produtos', component: ListProducts},
    {path: 'login', component: Login},
    {path: 'register', component: Register},
    {path: '**', component: InvalidPage}
];
