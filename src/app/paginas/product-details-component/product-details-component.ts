import { Component, Input } from '@angular/core';
import { Producto } from '../../modelos/productos';

@Component({
  selector: 'app-product-details-component',
  imports: [],
  templateUrl: './product-details-component.html',
  styleUrl: './product-details-component.scss',
})
export class ProductDetailsComponent {

@Input() producto!: Producto;

}
