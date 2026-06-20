import { Component, OnInit, ChangeDetectorRef, Signal, inject } from '@angular/core';
import { ProductService } from '../../../index';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Producto } from '../../modelos/productos';
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { BehaviorSubject } from 'rxjs';
import { ProductDetailsComponent } from "../product-details-component/product-details-component";
import { CatalogService } from '../../servicios/catalog-service';
import { routes } from '../../app.routes';
import { Router } from '@angular/router';
import { CartService } from '../../servicios/cart-service';
import { ValueChangeEvent } from '@angular/forms';

@Component({
  selector: 'app-catalog-component',
  imports: [NgClass, NgForOf, ProductDetailsComponent, RouterLink, NgIf],
  templateUrl: './catalog-component.html',
  styleUrl: './catalog-component.scss',
})
export class CatalogComponent implements OnInit{
  constructor(private productService: ProductService,
              private ruta: ActivatedRoute,
              private router: Router,
              private cdr: ChangeDetectorRef,
              private catalogService: CatalogService,
              
  ) {}

  private seccionesSubject = new BehaviorSubject<string[]>([]);
  public cartService = inject(CartService);
  secciones$ = this.seccionesSubject.asObservable();
  categorias: {nombre: string, productos: Producto[]}[] = [];
  cantidadMostrada = 4
  productos = this.cartService.productosEscuchables
  

  ngOnInit(): void {

    this.ruta.paramMap.subscribe(param => {

      const categoriaSeleccionada = param.get("catalogo")

      this.categorias = [];
      console.log(categoriaSeleccionada);
      
      this.catalogService.guardarCategoria(categoriaSeleccionada||"all")

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
          if (data.length == 0) {
            this.router.navigate(["/catalog","all"])
          }
          
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

  compararCarrito(compararId: number){
    return this.cartService.compararConCarrito(compararId)
  }

  enviarAlCarrito(event: MouseEvent, producto: Producto): void {
    event.stopPropagation(); 
    this.cartService.agregarProducto(producto);
  }

}
