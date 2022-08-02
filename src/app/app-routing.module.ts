import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate,Route } from '@angular/router';
import { PeliculasformComponent } from './component-formPelis/peliculasform/peliculasform.component';
import { LoginComponent } from './component-login/login/login.component';
import { UserComponent } from './component-user/user/user.component';
import { UserGuardGuard } from './user-guard.guard';
import { FormPelisComponent } from './component-formCorreo/form-pelis/form-pelis.component';
import { RutaErrorComponent } from './component-rutaError/ruta-error/ruta-error.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path:'login/user',
    component: UserComponent,
    canActivate: [UserGuardGuard]
  },
  {
    path: 'peliculas/add',
    component:PeliculasformComponent,
    canActivate:[UserGuardGuard]
  },
  {
    path: 'peliculas/edit/:id',
    component:PeliculasformComponent,
    canActivate: [UserGuardGuard]
  },
  {
    path: 'peliculas/correo',
    component:FormPelisComponent,
    canActivate: [UserGuardGuard]
  },
  {
    path: 'ruta/error',
    component:RutaErrorComponent
  },
  {
    path: '**',
    redirectTo: 'ruta/error'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
