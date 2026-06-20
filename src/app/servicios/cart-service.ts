import { Injectable, signal, computed } from '@angular/core';
import { Producto } from '../modelos/productos';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    private _productosSeleccionados = signal<Producto[]>([]);

    productosEscuchables = this._productosSeleccionados.asReadonly();

    cantidadTotal = computed(() => this._productosSeleccionados().length);

    precioTotal = computed(() => this._productosSeleccionados().reduce((acumulado, producto) => acumulado + producto.precio, 0));

    agregarProducto(nuevoProducto: Producto) {
        const yaExiste = this._productosSeleccionados().some(p => p.id === nuevoProducto.id);

        if (yaExiste) {
            this._productosSeleccionados.update((listaActual) => 
            listaActual.filter(p => p.id !== nuevoProducto.id));
        } else {
            this._productosSeleccionados.update((listaActual) => [...listaActual, nuevoProducto]);
        }
    }

    compararConCarrito(id:number):Boolean{
        return (this._productosSeleccionados().some(producto => producto.id === id))
    }
}
