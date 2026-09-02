import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../servicios/usuarios';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css'
})
export class Usuarios implements OnInit {

  usuarios: any;
  mostrarFormulario: boolean = false;
  mostrarFormularioEditar: boolean = false;
  idEditando: number = 0;

  nuevoUsuario: any = {
    usuario: '',
    correo: '',
    clave: '',
    fo_rol_usuario: ''
  };

  usuarioEditar: any = {
    usuario: '',
    correo: '',
    clave: '',
    fo_rol_usuario: ''
  };

  constructor(private _usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.consulta();
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    this.mostrarFormularioEditar = false;
  }

  consulta() {
    this._usuariosService.consulta().subscribe(
      (resultado: any) => {
        this.usuarios = resultado;
      }
    );
  }

  insertar() {
    this._usuariosService.insertar(this.nuevoUsuario).subscribe(
      (resultado: any) => {
        alert(resultado.mensaje);
        this.consulta();
        this.mostrarFormulario = false;
        this.nuevoUsuario = {
          usuario: '',
          correo: '',
          clave: '',
          fo_rol_usuario: ''
        };
      }
    );
  }

  abrirEditar(item: any) {
    this.idEditando = item.id_usuarios;
    this.usuarioEditar = {
      usuario: item.usuario,
      correo: item.correo,
      clave: item.clave,
      fo_rol_usuario: item.fo_rol_usuario
    };
    this.mostrarFormularioEditar = true;
    this.mostrarFormulario = false;
  }

  editar() {
    this._usuariosService.editar(this.idEditando, this.usuarioEditar).subscribe(
      (resultado: any) => {
        alert(resultado.mensaje);
        this.consulta();
        this.mostrarFormularioEditar = false;
      }
    );
  }

  eliminar(id: number) {
    const confirmacion = confirm('¿Está seguro de que desea eliminar este usuario?');
    if (confirmacion) {
      this._usuariosService.eliminar(id).subscribe(
        (resultado: any) => {
          alert(resultado.mensaje);
          this.consulta();
        }
      );
    }
  }
}