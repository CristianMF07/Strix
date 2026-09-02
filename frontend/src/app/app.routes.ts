import { Routes } from '@angular/router';
import { Main } from './estructura/main';
import { Dashboard } from './modulos/dashboard/dashboard';
import { Clientes } from './modulos/clientes/clientes';
import { ProductosComponent } from './modulos/productos/productos';
import { Login } from './modulos/login/login';
import { Proveedores } from './modulos/proveedores/proveedores';
import { Usuarios } from './modulos/usuarios/usuarios';
import { Ventas } from './modulos/ventas/ventas';
import { Compras } from './modulos/compras/compras';
import { Inventario } from './modulos/inventario/inventario';
import { RolUsuario } from './modulos/rol-usuario/rol-usuario';


export const routes: Routes = [
    {    
        path: '', component: Main,
        children: [
            {path: 'dashboard', component: Dashboard},
            {path: 'clientes', component: Clientes},
            {path: 'productos', component: ProductosComponent},
            {path: 'proveedores', component: Proveedores},
            {path: 'usuarios', component: Usuarios},
            {path: 'ventas', component: Ventas},
            {path: 'compras', component: Compras},
            {path: 'inventario', component: Inventario},
            {path: 'rol-usuario', component: RolUsuario},
            {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
        ]
    },
    {path: 'login', component: Login},
];