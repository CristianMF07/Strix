import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../servicios/productos';
import { InventarioService } from '../../servicios/inventario';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class ProductosComponent implements OnInit {

  productos: any;
  inventarios: any;
  mostrarFormulario: boolean = false;
  mostrarFormularioEditar: boolean = false;
  idEditando: number = 0;

  nuevoProducto: any = {
    nombre: '',
    tipo: '',
    precio: '',
    talla: '',
    color: '',
    fo_inventario: ''
  };

  productoEditar: any = {
    nombre: '',
    tipo: '',
    precio: '',
    talla: '',
    color: '',
    fo_inventario: ''
  };

  constructor(
    private _productosService: ProductosService,
    private _inventarioService: InventarioService
  ) {}

  ngOnInit(): void {
    this.consulta();
    this.cargarInventarios();
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    this.mostrarFormularioEditar = false;
  }

  cargarInventarios() {
    this._inventarioService.consulta().subscribe(
      (resultado: any) => {
        this.inventarios = resultado;
      }
    );
  }

  consulta() {
    this._productosService.consulta().subscribe(
      (resultado: any) => {
        this.productos = resultado;
      }
    );
  }

  insertar() {
    this._productosService.insertar(this.nuevoProducto).subscribe(
      (resultado: any) => {
        alert(resultado.mensaje);
        this.consulta();
        this.mostrarFormulario = false;
        this.nuevoProducto = {
          nombre: '',
          tipo: '',
          precio: '',
          talla: '',
          color: '',
          fo_inventario: ''
        };
      }
    );
  }

  abrirEditar(item: any) {
    this.idEditando = item.id_productos;
    this.productoEditar = {
      nombre: item.nombre,
      tipo: item.tipo,
      precio: item.precio,
      talla: item.talla,
      color: item.color,
      fo_inventario: item.fo_inventario
    };
    this.mostrarFormularioEditar = true;
    this.mostrarFormulario = false;
  }

  editar() {
    this._productosService.editar(this.idEditando, this.productoEditar).subscribe(
      (resultado: any) => {
        alert(resultado.mensaje);
        this.consulta();
        this.mostrarFormularioEditar = false;
      }
    );
  }

  eliminar(id: number) {
    const confirmacion = confirm('¿Está seguro de que desea eliminar este producto?');
    if (confirmacion) {
      this._productosService.eliminar(id).subscribe(
        (resultado: any) => {
          alert(resultado.mensaje);
          this.consulta();
        }
      );
    }
  }
}