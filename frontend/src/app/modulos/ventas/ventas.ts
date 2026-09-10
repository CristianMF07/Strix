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

  // Controla qué panel se muestra: formulario de carrito, edición o resumen
  mostrarFormulario: boolean = false;
  mostrarFormularioEditar: boolean = false;
  mostrarResumen: boolean = false;
  idEditando: number = 0;

  // Datos generales del pedido (cabecera): a quién y quién vende
  pedido: any = {
    fecha: '',
    fo_usuario: '',
    fo_vendedor: ''
  };

  // Línea que se está armando antes de agregarla al carrito
  lineaActual: any = {
    fo_productos: '',
    cantidad: '',
    preciounitario: ''
  };

  // Carrito: productos que el vendedor ha ido agregando al pedido actual
  carrito: any[] = [];

  // Guarda el pedido recién confirmado para mostrarlo como resumen
  ultimoPedido: any[] = [];

  // Datos para editar una venta ya guardada (funcionalidad original, sin cambios)
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
    this.mostrarResumen = false;
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

  // Cuando el vendedor elige un producto, autocompleta el precio desde la base de datos
  onProductoSeleccionado() {
    const producto = this.productos.find(
      (p: any) => p.id_productos == this.lineaActual.fo_productos
    );
    if (producto) {
      this.lineaActual.preciounitario = producto.precio;
    }
  }

  // ── Cálculos por línea (se recalculan solos cuando cambia cantidad o precio) ──
  subtotalItem(item: any): number {
    const cantidad = Number(item.cantidad) || 0;
    const precio = Number(item.preciounitario) || 0;
    return cantidad * precio;
  }

  ivaItem(item: any): number {
    return this.subtotalItem(item) * 0.19;
  }

  totalItem(item: any): number {
    return this.subtotalItem(item) + this.ivaItem(item);
  }

  // ── Total general del carrito, sumando todas las líneas ──
  totalCarrito(): number {
    return this.carrito.reduce((acumulado, item) => acumulado + this.totalItem(item), 0);
  }

  // Agrega el producto actual como una nueva línea del carrito
  agregarAlCarrito() {
    if (!this.lineaActual.fo_productos || !this.lineaActual.cantidad || !this.lineaActual.preciounitario) {
      alert('Seleccione un producto e ingrese cantidad y precio antes de agregar');
      return;
    }

    const productoSeleccionado = this.productos.find(
      (p: any) => p.id_productos == this.lineaActual.fo_productos
    );

    this.carrito.push({
      fo_productos: this.lineaActual.fo_productos,
      nombre_producto: productoSeleccionado ? productoSeleccionado.nombre : '',
      cantidad: this.lineaActual.cantidad,
      preciounitario: this.lineaActual.preciounitario
    });

    // Limpia la línea para poder agregar el siguiente producto
    this.lineaActual = { fo_productos: '', cantidad: '', preciounitario: '' };
  }

  // Quita un producto completo del carrito
  quitarDelCarrito(index: number) {
    this.carrito.splice(index, 1);
  }

  // Guarda todo el carrito en la base de datos: una fila en "ventas" por cada producto
  confirmarPedido() {
    if (this.carrito.length === 0) {
      alert('El carrito está vacío, agregue al menos un producto');
      return;
    }
    if (!this.pedido.fecha || !this.pedido.fo_usuario || !this.pedido.fo_vendedor) {
      alert('Complete la fecha, el cliente y el vendedor antes de confirmar el pedido');
      return;
    }

    let pendientes = this.carrito.length;
    const itemsGuardados: any[] = [];

    this.carrito.forEach((item) => {
      const ventaParaGuardar = {
        fecha: this.pedido.fecha,
        fo_usuario: this.pedido.fo_usuario,
        fo_productos: item.fo_productos,
        cantidad: item.cantidad,
        preciounitario: item.preciounitario,
        subtotal: this.subtotalItem(item),
        iva: this.ivaItem(item),
        total: this.totalItem(item),
        fo_vendedor: this.pedido.fo_vendedor
      };

      this._ventasService.insertar(ventaParaGuardar).subscribe(() => {
        itemsGuardados.push({
          nombre_producto: item.nombre_producto,
          cantidad: item.cantidad,
          preciounitario: item.preciounitario,
          total: this.totalItem(item)
        });

        pendientes--;
        // Solo cuando TODOS los productos del pedido terminaron de guardarse,
        // mostramos el resumen y limpiamos el carrito
        if (pendientes === 0) {
          this.ultimoPedido = itemsGuardados;
          this.mostrarResumen = true;
          this.mostrarFormulario = false;
          this.carrito = [];
          this.pedido = { fecha: '', fo_usuario: '', fo_vendedor: '' };
          this.consulta();
        }
      });
    });
  }

  cerrarResumen() {
    this.mostrarResumen = false;
  }

  // ── Editar / eliminar una venta ya guardada (sin cambios respecto a antes) ──
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
    this.mostrarResumen = false;
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