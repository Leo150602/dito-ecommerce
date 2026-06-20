import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../../../index';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Producto } from '../../modelos/productos';
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { BehaviorSubject } from 'rxjs';
import { ProductDetailsComponent } from "../product-details-component/product-details-component";

@Component({
  selector: 'app-catalog-component',
  imports: [NgClass, NgForOf, ProductDetailsComponent, RouterLink, NgIf],
  templateUrl: './catalog-component.html',
  styleUrl: './catalog-component.scss',
})
export class CatalogComponent implements OnInit{
  constructor(private productService: ProductService,
              private ruta: ActivatedRoute,
              private cdr: ChangeDetectorRef
  ) {}

  private seccionesSubject = new BehaviorSubject<string[]>([]);
  secciones$ = this.seccionesSubject.asObservable();
  categorias: {nombre: string, productos: Producto[]}[] = [];
  cantidadMostrada = 4

  ngOnInit(): void {

    this.ruta.paramMap.subscribe(param => {

      const categoriaSeleccionada = param.get("catalogo")

      this.categorias = [];

      if (categoriaSeleccionada == "all"){
        this.cargarCategorias();
      }else this.seccionesSubject.next([categoriaSeleccionada as string])
    
    });

    

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

  private cargarProductos(secciones: string[]): void {
    if (secciones.includes('all')) {
      this.productService.getAllProducts().subscribe((data) => {
        this.categorias = [
          {
            nombre: 'all',
            productos: data,
          },
        ];
        this.cdr.detectChanges();
      });
    } else {
      secciones.forEach((categoria) => {
        this.productService.getProductsByCategory(categoria).subscribe((data) => {
          console.log(data);
          
          this.categorias = [
            ...this.categorias,
            {
              nombre: categoria,
              productos: data,
            },
          ];
          if (secciones.length == 1){
            this.cantidadMostrada = data.length
          }else this.cantidadMostrada = 4
          this.cdr.detectChanges();
        });
      });
    }
  }

}
