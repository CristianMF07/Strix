import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventarioService } from '../../servicios/inventario';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventario.html',
  styleUrl: './inventario.css'
})
export class Inventario implements OnInit {

  inventarios: any;
  mostrarFormulario: boolean = false;
  mostrarFormularioEditar: boolean = false;
  idEditando: number = 0;

  nuevoInventario: any = {
    stockactual: '',
    stockminimo: '',
    ultima_actualizacion: '',
    registromovimientos: ''
  };

  inventarioEditar: any = {
    stockactual: '',
    stockminimo: '',
    ultima_actualizacion: '',
    registromovimientos: ''
  };

  constructor(private _inventarioService: InventarioService) {}

  ngOnInit(): void {
    this.consulta();
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    this.mostrarFormularioEditar = false;
  }

  consulta() {
    this._inventarioService.consulta().subscribe(
      (resultado: any) => {
        this.inventarios = resultado;
      }
    );
  }

  insertar() {
    this._inventarioService.insertar(this.nuevoInventario).subscribe(
      (resultado: any) => {
        alert(resultado.mensaje);
        this.consulta();
        this.mostrarFormulario = false;
        this.nuevoInventario = {
          stockactual: '',
          stockminimo: '',
          ultima_actualizacion: '',
          registromovimientos: ''
        };
      }
    );
  }

  abrirEditar(item: any) {
    this.idEditando = item.id_inventario;
    this.inventarioEditar = {
      stockactual: item.stockactual,
      stockminimo: item.stockminimo,
      ultima_actualizacion: item.ultima_actualizacion,
      registromovimientos: item.registromovimientos
    };
    this.mostrarFormularioEditar = true;
    this.mostrarFormulario = false;
  }

  editar() {
    this._inventarioService.editar(this.idEditando, this.inventarioEditar).subscribe(
      (resultado: any) => {
        alert(resultado.mensaje);
        this.consulta();
        this.mostrarFormularioEditar = false;
      }
    );
  }

  eliminar(id: number) {
    const confirmacion = confirm('¿Está seguro de que desea eliminar este registro de inventario?');
    if (confirmacion) {
      this._inventarioService.eliminar(id).subscribe(
        (resultado: any) => {
          alert(resultado.mensaje);
          this.consulta();
        }
      );
    }
  }
}