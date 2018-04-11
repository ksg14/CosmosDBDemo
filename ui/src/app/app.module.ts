import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { TableService } from './table.service';
import { KeysPipe } from './keys.pipe';
import { SqlComponent } from './sql/sql.component';
import { SqlService } from './sql.service';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import { LoginRouteGuard } from './login-guard';
import { LoginService } from './login.service';
import { LoginComponent } from './login/login.component';
import { MongodbComponent } from './mongodb/mongodb.component';
import { CustomerPipePipe } from './customer-pipe.pipe';


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    KeysPipe,
    SqlComponent,
    LoginComponent,
    MongodbComponent,
    CustomerPipePipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    TableService,
    SqlService,
    LoginRouteGuard,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
