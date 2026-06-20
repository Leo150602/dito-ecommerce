import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

    private ultimaCategoriaSubject = new BehaviorSubject<string>('all');
    ultimaCategoria$ = this.ultimaCategoriaSubject.asObservable();

    guardarCategoria(categoria: string) {
        console.log(categoria);
        
        this.ultimaCategoriaSubject.next(categoria);
    }

    obtenerCategoriaActual(): string {
        console.log(this.ultimaCategoriaSubject.getValue());
        
        return this.ultimaCategoriaSubject.getValue();
    }

}

