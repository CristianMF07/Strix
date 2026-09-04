import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Revisa si existe un usuario guardado en el navegador
  const usuario = localStorage.getItem('usuarioLogueado');

  if (usuario) {
    // Si existe, permite el acceso
    return true;
  } else {
    // Si no existe, redirige al login
    router.navigate(['/login']);
    return false;
  }
};