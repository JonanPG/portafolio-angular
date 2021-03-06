import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoDescripcion } from 'src/app/interfaces/producto-descripcion.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: ProductoDescripcion;
  id: string;

  constructor(private route: ActivatedRoute,
              public productoService: ProductosService ) { }

  ngOnInit(): void {
    this.route.params
          .subscribe( parametros => {
      // tslint:disable-next-line: no-string-literal
      this.productoService.getProductos( parametros['id'])
            .subscribe( (producto: ProductoDescripcion) => {
              this.id = parametros['id'];
              this.producto = producto;
            });

    });
  }

}
