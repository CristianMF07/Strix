import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../servicios/cliente';
import { EstadoClienteService } from '../../servicios/estado-cliente';
import { UsuariosService } from '../../servicios/usuarios';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css'
})
export class Clientes implements OnInit {

  clientes: any;
  estados: any;
  usuarios: any;
  mostrarFormulario: boolean = false;
  mostrarFormularioEditar: boolean = false;
  idEditando: number = 0;

  nuevoCliente: any = {
    nombre: '',
    email: '',
    direccion: '',
    telefono: '',
    fo_estado: '',
    fo_usuario: ''
  };

  clienteEditar: any = {
    nombre: '',
    email: '',
    direccion: '',
    telefono: '',
    fo_estado: '',
    fo_usuario: ''
  };

  constructor(
    private _clienteService: ClienteService,
    private _estadoClienteService: EstadoClienteService,
    private _usuariosService: UsuariosService
  ) {}

  ngOnInit(): void {
    this.consulta();
    this.cargarEstados();
    this.cargarUsuarios();
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    this.mostrarFormularioEditar = false;
  }

  cargarEstados() {
    this._estadoClienteService.consulta().subscribe(
      (resultado: any) => {
        this.estados = resultado;
      }
    );
  }

  cargarUsuarios() {
    this._usuariosService.consulta().subscribe(
      (resultado: any) => {
        this.usuarios = resultado;
      }
    );
  }

  consulta() {
    this._clienteService.consulta().subscribe(
      (resultado: any) => {
        this.clientes = resultado;
      }
    );
  }

  insertar() {
    this._clienteService.insertar(this.nuevoCliente).subscribe(
      (resultado: any) => {
        alert(resultado.mensaje);
        this.consulta();
        this.mostrarFormulario = false;
        this.nuevoCliente = {
          nombre: '',
          email: '',
          direccion: '',
          telefono: '',
          fo_estado: '',
          fo_usuario: ''
        };
      }
    );
  }

  abrirEditar(item: any) {
    this.idEditando = item.id_cliente;
    this.clienteEditar = {
      nombre: item.nombre,
      email: item.email,
      direccion: item.direccion,
      telefono: item.telefono,
      fo_estado: item.fo_estado,
      fo_usuario: item.fo_usuario
    };
    this.mostrarFormularioEditar = true;
    this.mostrarFormulario = false;
  }

  editar() {
    this._clienteService.editar(this.idEditando, this.clienteEditar).subscribe(
      (resultado: any) => {
        alert(resultado.mensaje);
        this.consulta();
        this.mostrarFormularioEditar = false;
      }
    );
  }

  eliminar(id: number) {
    const confirmacion = confirm('¿Está seguro de que desea eliminar este cliente?');
    if (confirmacion) {
      this._clienteService.eliminar(id).subscribe(
        (resultado: any) => {
          alert(resultado.mensaje);
          this.consulta();
        }
      );
    }
  }
}