import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {

  constructor(private router: Router) {}

  cerrarSesion() {
    // Borra el usuario guardado en el navegador
    localStorage.removeItem('usuarioLogueado');
    // Redirige al login
    this.router.navigate(['/login']);
  }
}