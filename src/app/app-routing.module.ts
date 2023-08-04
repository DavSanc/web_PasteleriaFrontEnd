import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  /** Define la ruta de los dos modulos usando carga perezosa */
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import( './auth/auth.module' )
      .then( module => module.AuthModule )
  },
  {
    path: 'dashboard',
    loadChildren: () => import( './protected/protected.module' )
      .then( module => module.ProtectedModule )
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
