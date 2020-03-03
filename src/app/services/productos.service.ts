import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productoFiltrado: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {

    return new Promise((resolve, reject) => {
      this.http.get('https://angular-html-ddbb2.firebaseio.com/productos_idx.json')
        .subscribe((resp: Producto[]) => {
          this.productos = resp;
          this.cargando = false;
          resolve();
        });
    });
  }

  getProductos( id: string ) {
    return this.http.get(`https://angular-html-ddbb2.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto(termino : string){

    if (this.productos.length === 0) {
      this.cargarProductos().then( () => {
        this.filtrarProductos(termino);
      });
    } else {
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos( termino: string){
    this.productoFiltrado = [];
    termino = termino.toLowerCase();
    this.productos.forEach(prod => {

      const categoriaLower = prod.categoria.toLowerCase();
      const tituloLower = prod.titulo.toLowerCase();

      if(categoriaLower.indexOf( termino ) >= 0
          || tituloLower.indexOf( termino ) >= 0){
        this.productoFiltrado.push( prod );
      }
    });
  }
}
