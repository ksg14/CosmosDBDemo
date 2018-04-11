import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TableComponent } from './table/table.component';
import { LoginRouteGuard } from './login-guard';
import { SqlComponent } from './sql/sql.component';
import { MongodbComponent } from './mongodb/mongodb.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'session',
    component: TableComponent,
    canActivate: [LoginRouteGuard]
  },
  {
    path: 'inventory',
    component: SqlComponent,
    canActivate: [LoginRouteGuard]
  },
  {
    path: 'customer',
    component: MongodbComponent,
    canActivate: [LoginRouteGuard]
  }
]


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
