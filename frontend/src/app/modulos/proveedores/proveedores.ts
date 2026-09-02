import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProveedorService } from '../../servicios/proveedor';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './proveedores.html',
  styleUrl: './proveedores.css'
})
export class Proveedores implements OnInit {

  proveedores: any;
  mostrarFormulario: boolean = false;
  mostrarFormularioEditar: boolean = false;
  idEditando: number = 0;

  nuevoProveedor: any = {
    nombre_empresa: '',
    producto_ofrecido: '',
    fo_productos: '',
    contacto: '',
    condiciones_comerciales: ''
  };

  proveedorEditar: any = {
    nombre_empresa: '',
    producto_ofrecido: '',
    fo_productos: '',
    contacto: '',
    condiciones_comerciales: ''
  };

  constructor(private _proveedorService: ProveedorService) {}

  ngOnInit(): void {
    this.consulta();
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    this.mostrarFormularioEditar = false;
  }

  consulta() {
    this._proveedorService.consulta().subscribe(
      (resultado: any) => {
        this.proveedores = resultado;
      }
    );
  }

  insertar() {
    this._proveedorService.insertar(this.nuevoProveedor).subscribe(
      (resultado: any) => {
        alert(resultado.mensaje);
        this.consulta();
        this.mostrarFormulario = false;
        this.nuevoProveedor = {
          nombre_empresa: '',
          producto_ofrecido: '',
          fo_productos: '',
          contacto: '',
          condiciones_comerciales: ''
        };
      }
    );
  }

  abrirEditar(item: any) {
    this.idEditando = item.id_proveedor;
    this.proveedorEditar = {
      nombre_empresa: item.nombre_empresa,
      producto_ofrecido: item.producto_ofrecido,
      fo_productos: item.fo_productos,
      contacto: item.contacto,
      condiciones_comerciales: item.condiciones_comerciales
    };
    this.mostrarFormularioEditar = true;
    this.mostrarFormulario = false;
  }

  editar() {
    this._proveedorService.editar(this.idEditando, this.proveedorEditar).subscribe(
      (resultado: any) => {
        alert(resultado.mensaje);
        this.consulta();
        this.mostrarFormularioEditar = false;
      }
    );
  }

  eliminar(id: number) {
    const confirmacion = confirm('¿Está seguro de que desea eliminar este proveedor?');
    if (confirmacion) {
      this._proveedorService.eliminar(id).subscribe(
        (resultado: any) => {
          alert(resultado.mensaje);
          this.consulta();
        }
      );
    }
  }
}