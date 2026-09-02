import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../servicios/productos';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class ProductosComponent implements OnInit {

  // Lista de productos de la base de datos
  productos: any;

  // Controla si el formulario de insertar se muestra o no
  mostrarFormulario: boolean = false;

  // Controla si el formulario de editar se muestra o no
  mostrarFormularioEditar: boolean = false;

  // Guarda el id del producto que se está editando
  idEditando: number = 0;

  // Objeto para el formulario de insertar
  nuevoProducto: any = {
    nombre: '',
    tipo: '',
    precio: '',
    talla: '',
    color: '',
    fo_inventario: ''
  };

  // Objeto para el formulario de editar
  productoEditar: any = {
    nombre: '',
    tipo: '',
    precio: '',
    talla: '',
    color: '',
    fo_inventario: ''
  };

  constructor(private _productosService: ProductosService) {}

  ngOnInit(): void {
    this.consulta();
  }

  // Muestra u oculta el formulario de insertar
  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    this.mostrarFormularioEditar = false;
  }

  // Consulta todos los productos
  consulta() {
    this._productosService.consulta().subscribe(
      (resultado: any) => {
        this.productos = resultado;
      }
    );
  }

  // Inserta un nuevo producto
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

  // Abre el formulario de editar con los datos del producto seleccionado
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

  // Guarda los cambios del producto editado
  editar() {
    this._productosService.editar(this.idEditando, this.productoEditar).subscribe(
      (resultado: any) => {
        alert(resultado.mensaje);
        this.consulta();
        this.mostrarFormularioEditar = false;
      }
    );
  }

  // Elimina un producto por su id
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