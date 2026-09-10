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
  mostrarResumen: boolean = false;
  idEditando: number = 0;

  // Datos generales del pedido de compra (cabecera): a qué proveedor y qué día
  pedido: any = {
    fecha: '',
    fo_proveedor: ''
  };

  // Línea que se está armando antes de agregarla al carrito
  lineaActual: any = {
    fo_productos: '',
    cantidades: '',
    precio_unitario: ''
  };

  // Carrito: productos que se van a pedir al proveedor en este pedido
  carrito: any[] = [];

  // Guarda el pedido recién confirmado para mostrarlo como resumen
  ultimoPedido: any[] = [];

  // Datos para editar una compra ya guardada (funcionalidad original, sin cambios)
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
    this.mostrarResumen = false;
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

  // Al elegir un producto, autocompleta el precio desde la base de datos
  onProductoSeleccionado() {
    const producto = this.productos.find(
      (p: any) => p.id_productos == this.lineaActual.fo_productos
    );
    if (producto) {
      this.lineaActual.precio_unitario = producto.precio;
    }
  }

  // ── Cálculos por línea (se recalculan solos al cambiar cantidad o precio) ──
  subtotalItem(item: any): number {
    const cantidad = Number(item.cantidades) || 0;
    const precio = Number(item.precio_unitario) || 0;
    return cantidad * precio;
  }

  ivaItem(item: any): number {
    return this.subtotalItem(item) * 0.19;
  }

  totalItem(item: any): number {
    return this.subtotalItem(item) + this.ivaItem(item);
  }

  totalCarrito(): number {
    return this.carrito.reduce((acumulado, item) => acumulado + this.totalItem(item), 0);
  }

  // Agrega el producto actual como una nueva línea del carrito
  agregarAlCarrito() {
    if (!this.lineaActual.fo_productos || !this.lineaActual.cantidades || !this.lineaActual.precio_unitario) {
      alert('Seleccione un producto e ingrese cantidad y precio antes de agregar');
      return;
    }

    const productoSeleccionado = this.productos.find(
      (p: any) => p.id_productos == this.lineaActual.fo_productos
    );

    this.carrito.push({
      fo_productos: this.lineaActual.fo_productos,
      nombre_producto: productoSeleccionado ? productoSeleccionado.nombre : '',
      cantidades: this.lineaActual.cantidades,
      precio_unitario: this.lineaActual.precio_unitario
    });

    this.lineaActual = { fo_productos: '', cantidades: '', precio_unitario: '' };
  }

  quitarDelCarrito(index: number) {
    this.carrito.splice(index, 1);
  }

  // Guarda todo el carrito en la base de datos: una fila en "compras" por cada producto
  confirmarPedido() {
    if (this.carrito.length === 0) {
      alert('El carrito está vacío, agregue al menos un producto');
      return;
    }
    if (!this.pedido.fecha || !this.pedido.fo_proveedor) {
      alert('Complete la fecha y el proveedor antes de confirmar el pedido');
      return;
    }

    let pendientes = this.carrito.length;
    const itemsGuardados: any[] = [];

    this.carrito.forEach((item) => {
      const compraParaGuardar = {
        fecha: this.pedido.fecha,
        fo_proveedor: this.pedido.fo_proveedor,
        fo_productos: item.fo_productos,
        cantidades: item.cantidades,
        precio_unitario: item.precio_unitario,
        subtotal: this.subtotalItem(item),
        iva: this.ivaItem(item),
        total: this.totalItem(item)
      };

      this._comprasService.insertar(compraParaGuardar).subscribe(() => {
        itemsGuardados.push({
          nombre_producto: item.nombre_producto,
          cantidades: item.cantidades,
          precio_unitario: item.precio_unitario,
          total: this.totalItem(item)
        });

        pendientes--;
        if (pendientes === 0) {
          this.ultimoPedido = itemsGuardados;
          this.mostrarResumen = true;
          this.mostrarFormulario = false;
          this.carrito = [];
          this.pedido = { fecha: '', fo_proveedor: '' };
          this.consulta();
        }
      });
    });
  }

  cerrarResumen() {
    this.mostrarResumen = false;
  }

  // ── Editar / eliminar una compra ya guardada (sin cambios respecto a antes) ──
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
    this.mostrarResumen = false;
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