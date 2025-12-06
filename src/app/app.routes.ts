import { Routes } from '@angular/router';
import { ListProducts } from './feature/products/list-products/list-products';
import { InvalidPage } from './feature/invalid-page/invalid-page';
import { Login } from './feature/auth/login/login';
import { Register } from './feature/auth/register/register';
import { RegisterProducts } from './feature/products/register-products/register-products';
import { EditProducts } from './feature/products/edit-products/edit-products';

export const routes: Routes = [
    {path: '', component: Login},
    {path: 'product-management/list', component: ListProducts},
    {path: 'product-management/register-products', component: RegisterProducts},
    {path: 'product-management/edit-products/:id', component: EditProducts},
    {path: 'login', component: Login},
    {path: 'register', component: Register},
    {path: '**', component: InvalidPage}
];
