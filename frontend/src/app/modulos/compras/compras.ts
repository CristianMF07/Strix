import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComprasService } from '../../servicios/compras';
import { ProductosService } from '../../servicios/productos';
import { ProveedorService } from '../../servicios/proveedor';

@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './compras.html',
  styleUrl: './compras.css'
})
export class Compras implements OnInit {

  compras: any;
  productos: any;
  proveedores: any;
  mostrarFormulario: boolean = false;
  mostrarFormularioEditar: boolean = false;
  idEditando: number = 0;

  nuevaCompra: any = {
    fecha: '',
    fo_proveedor: '',
    fo_productos: '',
    cantidades: '',
    precio_unitario: '',
    subtotal: '',
    iva: '',
    total: ''
  };

  compraEditar: any = {
    fecha: '',
    fo_proveedor: '',
    fo_productos: '',
    cantidades: '',
    precio_unitario: '',
    subtotal: '',
    iva: '',
    total: ''
  };

  constructor(
    private _comprasService: ComprasService,
    private _productosService: ProductosService,
    private _proveedorService: ProveedorService
  ) {}

  ngOnInit(): void {
    this.consulta();
    this.cargarProductos();
    this.cargarProveedores();
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

  cargarProveedores() {
    this._proveedorService.consulta().subscribe(
      (resultado: any) => { this.proveedores = resultado; }
    );
  }

  consulta() {
    this._comprasService.consulta().subscribe(
      (resultado: any) => { this.compras = resultado; }
    );
  }

  insertar() {
    this._comprasService.insertar(this.nuevaCompra).subscribe(
      (resultado: any) => {
        alert(resultado.mensaje);
        this.consulta();
        this.mostrarFormulario = false;
        this.nuevaCompra = {
          fecha: '',
          fo_proveedor: '',
          fo_productos: '',
          cantidades: '',
          precio_unitario: '',
          subtotal: '',
          iva: '',
          total: ''
        };
      }
    );
  }

  abrirEditar(item: any) {
    this.idEditando = item.id_compras;
    this.compraEditar = {
      fecha: item.fecha,
      fo_proveedor: item.fo_proveedor,
      fo_productos: item.fo_productos,
      cantidades: item.cantidades,
      precio_unitario: item.precio_unitario,
      subtotal: item.subtotal,
      iva: item.iva,
      total: item.total
    };
    this.mostrarFormularioEditar = true;
    this.mostrarFormulario = false;
  }

  editar() {
    this._comprasService.editar(this.idEditando, this.compraEditar).subscribe(
      (resultado: any) => {
        alert(resultado.mensaje);
        this.consulta();
        this.mostrarFormularioEditar = false;
      }
    );
  }

  eliminar(id: number) {
    const confirmacion = confirm('¿Está seguro de que desea eliminar esta compra?');
    if (confirmacion) {
      this._comprasService.eliminar(id).subscribe(
        (resultado: any) => {
          alert(resultado.mensaje);
          this.consulta();
        }
      );
    }
  }
}