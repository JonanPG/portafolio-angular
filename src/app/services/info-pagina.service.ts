import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';
import { Equipo } from '../interfaces/equipo.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  equipo: Equipo[];
  cargada = false;

  constructor(private http: HttpClient) {
    this.cargarInfo();
    this.cargarEquipo();
  }

   private cargarInfo(){
      //Leer el archivo JSON
      this.http.get('assets/data/data-pagina.json')
      .subscribe((resp: InfoPagina) => {
        this.cargada = true;
        this.info = resp;
      });
   }

   private cargarEquipo(){
      this.http.get('https://angular-html-ddbb2.firebaseio.com/equipo.json')
      .subscribe((resp: Equipo[]) => {
        this.equipo = resp;
      });
   }
}
