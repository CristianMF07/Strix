import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../servicios/usuarios';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  // Datos que el usuario escribe en el formulario
  credenciales: any = {
    usuario: '',
    clave: ''
  };

  // Mensaje de error si el login falla
  mensajeError: string = '';

  constructor(
    private _usuariosService: UsuariosService,
    private router: Router
  ) {}

  ingresar() {
    this._usuariosService.login(this.credenciales).subscribe(
      (resultado: any) => {
        // Si el arreglo tiene al menos un resultado, las credenciales son correctas
        if (resultado && resultado.length > 0) {
          // Guardamos el usuario en el navegador para saber que está autenticado
          localStorage.setItem('usuarioLogueado', JSON.stringify(resultado[0]));
          this.mensajeError = '';
          this.router.navigate(['/dashboard']);
        } else {
          this.mensajeError = 'Usuario o contraseña incorrectos';
        }
      }
    );
  }
}