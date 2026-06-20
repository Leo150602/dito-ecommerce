import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../modelos/productos';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private api = 'https://fakestoreapi.com/products/';

  private http = inject(HttpClient);


  getAllProducts(): Observable<Producto[]> {
    return this.http.get<any[]>(`${this.api}`).pipe(
      map(data =>
        data.map(item => this.mapeoProductos(item))),
      map(productos =>
        productos.sort((a, b) => b.rating.rate - a.rating.rate)
        )
    );
  }

  getProductById(id: number): Observable<Producto> {
    return this.http.get<any>(`${this.api}/${id}`).pipe(
      map(item => this.mapeoProductos(item))
    );
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.api}categories`);
  }

  getProductsByCategory(category: string): Observable<Producto[]> {
    return this.http.get<any[]>(`${this.api}category/${category}`).pipe(
      map(data =>
        data.map(item => this.mapeoProductos(item))),
      map(productos =>
        productos.sort((a, b) => b.rating.rate - a.rating.rate)
        )
    );
  }

  private mapeoProductos(item: any): Producto {
    return {
      id: item.id,
      nombre: item.title,
      precio: item.price,
      descripcion: item.description,
      categoria: item.category,
      foto: item.image,
      rating: {
        rate: item.rating.rate,
        count: item.rating.count
      }
    };
  } 
}
  