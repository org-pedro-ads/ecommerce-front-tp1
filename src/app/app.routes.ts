import { Routes } from '@angular/router';
import { ListProducts } from './feature/products/list-products/list-products';
import { InvalidPage } from './feature/invalid-page/invalid-page';
import { Login } from './feature/auth/login/login';
import { Register } from './feature/auth/register/register';
import { RegisterProducts } from './feature/products/register-products/register-products';
import { EditProducts } from './feature/products/edit-products/edit-products';
import { Catalog } from './feature/products/catalog/catalog';
import { ShoppingCart } from './feature/products/shopping-cart/shopping-cart';

export const routes: Routes = [
    {path: '', component: Login},
    {path: 'products/product-management/list', component: ListProducts},
    {path: 'products/product-management/register-products', component: RegisterProducts},
    {path: 'products/product-management/edit-products/:id', component: EditProducts},
    {path: 'products', component: ListProducts},
    {path: 'products/catalog', component: Catalog },
    {path: 'login', component: Login},
    {path: 'register', component: Register},
    {path: 'carrinho', component: ShoppingCart},
    {path: '**', component: InvalidPage}
];
