import { Component } from '@angular/core';
import { ProductService } from '../../../index';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../../modelos/productos';
import { NgClass, NgForOf } from "@angular/common";
import { BehaviorSubject } from 'rxjs';
import { ProductDetailsComponent } from "../product-details-component/product-details-component";

@Component({
  selector: 'app-catalog-component',
  imports: [NgClass, NgForOf, ProductDetailsComponent],
  templateUrl: './catalog-component.html',
  styleUrl: './catalog-component.scss',
})
export class CatalogComponent {
  constructor(private productService: ProductService) {}

  private seccionesSubject = new BehaviorSubject<string[]>([]);
  secciones$ = this.seccionesSubject.asObservable();
  categorias: {nombre: string, productos: Producto[]}[] = [];

  ngOnInit(): void {
    this.cargarCategorias();

    this.secciones$
      .subscribe(secciones => {

        if (!secciones.length) return;

        this.cargarProductos(secciones);

      });
    
    console.log(this.categorias);
  }

  private cargarCategorias(): void {
    this.productService.getCategories().subscribe((data) => {
      if (data.length == 0) {
        this.seccionesSubject.next(['all']);
      } else {
        this.seccionesSubject.next([
          ...data
        ]);
      }
    });
  }

  private cargarProductos(secciones:string[]): void {
    if (secciones.includes('all')) {
      this.productService.getAllProducts().subscribe((data) => {
        console.log(data);
        this.categorias.push({
          nombre: 'all',
          productos: data
        });
      });
    }else {
      secciones.forEach((categoria)=> {
        console.log(categoria);
        this.productService.getProductsByCategory(categoria).subscribe((data) => {
          console.log(data);
          this.categorias.push({
            nombre: categoria,
            productos: data
          });
        });
      });
    }
  }

}
