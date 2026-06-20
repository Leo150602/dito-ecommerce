import { Routes } from '@angular/router';
import {CatalogComponent, ProductDetailsComponent } from '../index'; 

export const routes: Routes = [

    {
        path: 'catalog/:catalogo',
        component: CatalogComponent
    },
    {
        path: 'product/:id',
        component: ProductDetailsComponent
    },
    {
        path: '',
        redirectTo: 'catalog/all',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'catalog/all'
    }

];
