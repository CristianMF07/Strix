import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  url = 'http://strixshopmanager.infinityfree.me/backend/controladores/usuarios.php';

  constructor(private http: HttpClient) {}

  consulta() {
    return this.http.get(`${this.url}?control=consulta`);
  }

  login(params: any) {
    return this.http.post(`${this.url}?control=login`, JSON.stringify(params));
  }

  insertar(params: any) {
    return this.http.post(`${this.url}?control=insertar`, JSON.stringify(params));
  }

  editar(id: number, params: any) {
    return this.http.post(`${this.url}?control=editar&id=${id}`, JSON.stringify(params));
  }

  eliminar(id: number) {
    return this.http.get(`${this.url}?control=eliminar&id=${id}`);
  }
}