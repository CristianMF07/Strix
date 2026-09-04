import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstadoClienteService } from '../../servicios/estado-cliente';

@Component({
  selector: 'app-estado-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './estado-cliente.html',
  styleUrl: './estado-cliente.css'
})
export class EstadoCliente implements OnInit {

  estados: any;
  mostrarFormulario: boolean = false;
  mostrarFormularioEditar: boolean = false;
  idEditando: number = 0;

  nuevoEstado: any = {
    estado: ''
  };

  estadoEditar: any = {
    estado: ''
  };

  constructor(private _estadoClienteService: EstadoClienteService) {}

  ngOnInit(): void {
    this.consulta();
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    this.mostrarFormularioEditar = false;
  }

  consulta() {
    this._estadoClienteService.consulta().subscribe(
      (resultado: any) => {
        this.estados = resultado;
      }
    );
  }

  insertar() {
    this._estadoClienteService.insertar(this.nuevoEstado).subscribe(
      (resultado: any) => {
        alert(resultado.mensaje);
        this.consulta();
        this.mostrarFormulario = false;
        this.nuevoEstado = { estado: '' };
      }
    );
  }

  abrirEditar(item: any) {
    this.idEditando = item.id_estado;
    this.estadoEditar = { estado: item.estado };
    this.mostrarFormularioEditar = true;
    this.mostrarFormulario = false;
  }

  editar() {
    this._estadoClienteService.editar(this.idEditando, this.estadoEditar).subscribe(
      (resultado: any) => {
        alert(resultado.mensaje);
        this.consulta();
        this.mostrarFormularioEditar = false;
      }
    );
  }

  eliminar(id: number) {
    const confirmacion = confirm('¿Está seguro de que desea eliminar este estado?');
    if (confirmacion) {
      this._estadoClienteService.eliminar(id).subscribe(
        (resultado: any) => {
          alert(resultado.mensaje);
          this.consulta();
        }
      );
    }
  }
}