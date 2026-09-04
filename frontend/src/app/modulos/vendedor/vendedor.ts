import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VendedorService } from '../../servicios/vendedor';
import { RolUsuarioService } from '../../servicios/rol-usuario';

@Component({
  selector: 'app-vendedor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vendedor.html',
  styleUrl: './vendedor.css'
})
export class Vendedor implements OnInit {

  vendedores: any;
  roles: any;
  mostrarFormulario: boolean = false;
  mostrarFormularioEditar: boolean = false;
  idEditando: number = 0;

  nuevoVendedor: any = {
    vendedor: '',
    fo_rol_usuario: ''
  };

  vendedorEditar: any = {
    vendedor: '',
    fo_rol_usuario: ''
  };

  constructor(
    private _vendedorService: VendedorService,
    private _rolUsuarioService: RolUsuarioService
  ) {}

  ngOnInit(): void {
    this.consulta();
    this.cargarRoles();
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    this.mostrarFormularioEditar = false;
  }

  cargarRoles() {
    this._rolUsuarioService.consulta().subscribe(
      (resultado: any) => {
        this.roles = resultado;
      }
    );
  }

  consulta() {
    this._vendedorService.consulta().subscribe(
      (resultado: any) => {
        this.vendedores = resultado;
      }
    );
  }

  insertar() {
    this._vendedorService.insertar(this.nuevoVendedor).subscribe(
      (resultado: any) => {
        alert(resultado.mensaje);
        this.consulta();
        this.mostrarFormulario = false;
        this.nuevoVendedor = {
          vendedor: '',
          fo_rol_usuario: ''
        };
      }
    );
  }

  abrirEditar(item: any) {
    this.idEditando = item.id_vendedor;
    this.vendedorEditar = {
      vendedor: item.vendedor,
      fo_rol_usuario: item.fo_rol_usuario
    };
    this.mostrarFormularioEditar = true;
    this.mostrarFormulario = false;
  }

  editar() {
    this._vendedorService.editar(this.idEditando, this.vendedorEditar).subscribe(
      (resultado: any) => {
        alert(resultado.mensaje);
        this.consulta();
        this.mostrarFormularioEditar = false;
      }
    );
  }

  eliminar(id: number) {
    const confirmacion = confirm('¿Está seguro de que desea eliminar este vendedor?');
    if (confirmacion) {
      this._vendedorService.eliminar(id).subscribe(
        (resultado: any) => {
          alert(resultado.mensaje);
          this.consulta();
        }
      );
    }
  }
}