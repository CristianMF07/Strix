import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentasService } from '../../servicios/ventas';
import { ProductosService } from '../../servicios/productos';
import { ComprasService } from '../../servicios/compras';

declare var Chart: any;

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit, AfterViewInit {

  ventas: any[] = [];
  productos: any[] = [];
  compras: any[] = [];

  totalIngresos: number = 0;
  totalVentas: number = 0;
  productosPocoStock: number = 0;
  totalDevoluciones: number = 0;

  constructor(
    private _ventasService: VentasService,
    private _productosService: ProductosService,
    private _comprasService: ComprasService
  ) {}

  ngOnInit(): void {
    this.cargarVentas();
    this.cargarProductos();
    this.cargarCompras();
  }

  ngAfterViewInit(): void {
    // Esperamos un momento a que lleguen los datos antes de dibujar el gráfico
    setTimeout(() => {
      this.crearGraficoBarras();
    }, 800);
  }

  cargarVentas() {
    this._ventasService.consulta().subscribe(
      (resultado: any) => {
        this.ventas = resultado;
        // Sumamos el total de todas las ventas
        this.totalIngresos = this.ventas.reduce(
          (acumulado, venta) => acumulado + Number(venta.total || 0), 0
        );
        this.totalVentas = this.ventas.length;
      }
    );
  }

  cargarProductos() {
    this._productosService.consulta().subscribe(
      (resultado: any) => {
        this.productos = resultado;
        // Contamos productos cuyo stock actual es menor o igual al mínimo
        this.productosPocoStock = this.productos.filter(
          (p: any) => Number(p.stock_actual) <= Number(p.stock_minimo)
        ).length;
      }
    );
  }

  cargarCompras() {
    this._comprasService.consulta().subscribe(
      (resultado: any) => {
        this.compras = resultado;
      }
    );
  }

  crearGraficoBarras() {
    const canvas = document.getElementById('barChart') as HTMLCanvasElement;
    if (!canvas) return;

    // Agrupamos las ventas por mes
    const ventasPorMes: any = {};
    this.ventas.forEach((venta: any) => {
      const fecha = new Date(venta.fecha);
      const mes = fecha.toLocaleString('es-CO', { month: 'short' });
      ventasPorMes[mes] = (ventasPorMes[mes] || 0) + Number(venta.total || 0);
    });

    const labels = Object.keys(ventasPorMes);
    const data = Object.values(ventasPorMes);

    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: labels.length ? labels : ['Sin datos'],
        datasets: [{
          label: 'Ventas ($)',
          data: data.length ? data : [0],
          backgroundColor: 'rgba(245,166,35,.75)',
          borderRadius: 6,
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: 'rgba(46,54,80,.5)' } },
          y: { grid: { color: 'rgba(46,54,80,.5)' } }
        }
      }
    });
  }
}