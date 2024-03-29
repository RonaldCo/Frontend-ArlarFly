import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionGuard } from 'src/app/guards/session.guard';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { GetComponent } from './get/get.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateComponent,
  }, {
    path: 'edit',
    component: EditComponent,
    canActivate: [SessionGuard],
  }, {
    path: 'get',
    component: GetComponent,
    canActivate: [SessionGuard],
  },
  {
    path: '',
    redirectTo: 'get'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RouteRoutingModule { }
