export interface Producto {
    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
    categoria:string;
    foto: string;
    rating:{
        rate: number;
        count: number;
    }
}