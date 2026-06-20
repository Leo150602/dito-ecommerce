import { Component, Input, ChangeDetectorRef, inject} from '@angular/core';
import { CartService, ProductService } from '../../../index';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Producto } from '../../modelos/productos';
import { NgIf, NgClass } from '@angular/common';
import { CatalogService } from '../../servicios/catalog-service';

@Component({
  selector: 'app-product-details-component',
  imports: [NgIf, RouterLink, NgClass],
  templateUrl: './product-details-component.html',
  styleUrl: './product-details-component.scss',
})
export class ProductDetailsComponent {

  constructor(private productService: ProductService,
              private ruta: ActivatedRoute,
              private cdr: ChangeDetectorRef,
              private catalogService: CatalogService
  ) {}

  public cartService = inject(CartService);
  productos = this.cartService.productosEscuchables
  producto:Producto|undefined 
  id:string = ""
  categoriaGuardada:string = "all"

  ngOnInit(): void {
    
    this.categoriaGuardada = this.catalogService.obtenerCategoriaActual()

    this.ruta.paramMap.subscribe(param => {

      this.id = param.get("id")||""

      this.cargarProducto()

    });

    
    
  }

  compararCarrito(compararId: number){
    return this.cartService.compararConCarrito(compararId)
  }

  private cargarProducto(){
    this.productService.getProductById(+this.id).subscribe((product) => {
      this.producto = product
      this.cdr.detectChanges();
    })
  }

  enviarAlCarrito(producto: Producto): void {
    this.cartService.agregarProducto(producto);
  }
}
