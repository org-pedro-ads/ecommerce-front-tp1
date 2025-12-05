import { Routes } from '@angular/router';
import { ListProducts } from './feature/products/list-products/list-products';
import { InvalidPage } from './feature/invalid-page/invalid-page';
import { Login } from './feature/auth/login/login';

export const routes: Routes = [
    {path: '', component: ListProducts},
    {path: 'produtos', component: ListProducts},
    {path: 'login', component: Login},
    {path: '**', component: InvalidPage}
];
