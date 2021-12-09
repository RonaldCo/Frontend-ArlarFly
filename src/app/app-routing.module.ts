import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './assets/error/error.component';
import { IndexComponent } from './assets/index/index.component';
import { LoginComponent } from './modulos/security/login/login.component';


const routes: Routes = [
  {
    path: 'index',
    component: IndexComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/index'
  },
  {
    path: 'security',
    loadChildren: () => import('./modulos/security/security.module').then(m => m.SecurityModule)
  },{
    path: 'admin',
    loadChildren: () => import('./modulos/admin/admin.module').then(m => m.AdminModule)
  },{
    path: 'airport',
    loadChildren: () => import('./modulos/airport/airport.module').then(m => m.AirportModule)
  },{
    path: 'flight',
    loadChildren: () => import('./modulos/flight/flight.module').then(m => m.FlightModule)
  },{
    path: 'route',
    loadChildren: () => import('./modulos/route/route.module').then(m => m.RouteModule)
  },
  {
    path: 'error',
    component: ErrorComponent,
  },{
    path: '**',
    redirectTo: '/error'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
