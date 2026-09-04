import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VentasService } from '../../servicios/ventas';
import { ProductosService } from '../../servicios/productos';
import { UsuariosService } from '../../servicios/usuarios';
import { VendedorService } from '../../servicios/vendedor';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ventas.html',
  styleUrl: './ventas.css'
})
export class Ventas implements OnInit {

  ventas: any;
  productos: any;
  usuarios: any;
  vendedores: any;
  mostrarFormulario: boolean = false;
  mostrarFormularioEditar: boolean = false;
  idEditando: number = 0;

  nuevaVenta: any = {
    fecha: '',
    fo_usuario: '',
    fo_productos: '',
    cantidad: '',
    preciounitario: '',
    subtotal: '',
    iva: '',
    total: '',
    fo_vendedor: ''
  };

  ventaEditar: any = {
    fecha: '',
    fo_usuario: '',
    fo_productos: '',
    cantidad: '',
    preciounitario: '',
    subtotal: '',
    iva: '',
    total: '',
    fo_vendedor: ''
  };

  constructor(
    private _ventasService: VentasService,
    private _productosService: ProductosService,
    private _usuariosService: UsuariosService,
    private _vendedorService: VendedorService
  ) {}

  ngOnInit(): void {
    this.consulta();
    this.cargarProductos();
    this.cargarUsuarios();
    this.cargarVendedores();
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    this.mostrarFormularioEditar = false;
  }

  cargarProductos() {
    this._productosService.consulta().subscribe(
      (resultado: any) => { this.productos = resultado; }
    );
  }

  cargarUsuarios() {
    this._usuariosService.consulta().subscribe(
      (resultado: any) => { this.usuarios = resultado; }
    );
  }

  cargarVendedores() {
    this._vendedorService.consulta().subscribe(
      (resultado: any) => { this.vendedores = resultado; }
    );
  }

  consulta() {
    this._ventasService.consulta().subscribe(
      (resultado: any) => { this.ventas = resultado; }
    );
  }

  insertar() {
    this._ventasService.insertar(this.nuevaVenta).subscribe(
      (resultado: any) => {
        alert(resultado.mensaje);
        this.consulta();
        this.mostrarFormulario = false;
        this.nuevaVenta = {
          fecha: '',
          fo_usuario: '',
          fo_productos: '',
          cantidad: '',
          preciounitario: '',
          subtotal: '',
          iva: '',
          total: '',
          fo_vendedor: ''
        };
      }
    );
  }

  abrirEditar(item: any) {
    this.idEditando = item.id_ventas;
    this.ventaEditar = {
      fecha: item.fecha,
      fo_usuario: item.fo_usuario,
      fo_productos: item.fo_productos,
      cantidad: item.cantidad,
      preciounitario: item.preciounitario,
      subtotal: item.subtotal,
      iva: item.iva,
      total: item.total,
      fo_vendedor: item.fo_vendedor
    };
    this.mostrarFormularioEditar = true;
    this.mostrarFormulario = false;
  }

  editar() {
    this._ventasService.editar(this.idEditando, this.ventaEditar).subscribe(
      (resultado: any) => {
        alert(resultado.mensaje);
        this.consulta();
        this.mostrarFormularioEditar = false;
      }
    );
  }

  eliminar(id: number) {
    const confirmacion = confirm('¿Está seguro de que desea eliminar esta venta?');
    if (confirmacion) {
      this._ventasService.eliminar(id).subscribe(
        (resultado: any) => {
          alert(resultado.mensaje);
          this.consulta();
        }
      );
    }
  }
}