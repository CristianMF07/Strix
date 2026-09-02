import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RolUsuarioService } from '../../servicios/rol-usuario';

@Component({
  selector: 'app-rol-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rol-usuario.html',
  styleUrl: './rol-usuario.css'
})
export class RolUsuario implements OnInit {

  roles: any;
  mostrarFormulario: boolean = false;
  mostrarFormularioEditar: boolean = false;
  idEditando: number = 0;

  nuevoRol: any = {
    administrador: '',
    trabajador: '',
    otros_usuarios: ''
  };

  rolEditar: any = {
    administrador: '',
    trabajador: '',
    otros_usuarios: ''
  };

  constructor(private _rolUsuarioService: RolUsuarioService) {}

  ngOnInit(): void {
    this.consulta();
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    this.mostrarFormularioEditar = false;
  }

  consulta() {
    this._rolUsuarioService.consulta().subscribe(
      (resultado: any) => {
        this.roles = resultado;
      }
    );
  }

  insertar() {
    this._rolUsuarioService.insertar(this.nuevoRol).subscribe(
      (resultado: any) => {
        alert(resultado.mensaje);
        this.consulta();
        this.mostrarFormulario = false;
        this.nuevoRol = {
          administrador: '',
          trabajador: '',
          otros_usuarios: ''
        };
      }
    );
  }

  abrirEditar(item: any) {
    this.idEditando = item.id_rol_usuario;
    this.rolEditar = {
      administrador: item.administrador,
      trabajador: item.trabajador,
      otros_usuarios: item.otros_usuarios
    };
    this.mostrarFormularioEditar = true;
    this.mostrarFormulario = false;
  }

  editar() {
    this._rolUsuarioService.editar(this.idEditando, this.rolEditar).subscribe(
      (resultado: any) => {
        alert(resultado.mensaje);
        this.consulta();
        this.mostrarFormularioEditar = false;
      }
    );
  }

  eliminar(id: number) {
    const confirmacion = confirm('¿Está seguro de que desea eliminar este rol?');
    if (confirmacion) {
      this._rolUsuarioService.eliminar(id).subscribe(
        (resultado: any) => {
          alert(resultado.mensaje);
          this.consulta();
        }
      );
    }
  }
}