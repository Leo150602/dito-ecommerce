import { Routes } from '@angular/router';
import {CatalogComponent, CartComponent, ProductDetailsComponent } from '../index'; 

export const routes: Routes = [

    {
        path: 'catalogo',
        component: CatalogComponent
    },
    {
        path: 'cart',
        component: CartComponent
    },
    {
        path: 'product/:id',
        component: ProductDetailsComponent
    },
    {
        path: '',
        redirectTo: 'catalogo',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'catalogo'
    }

];
