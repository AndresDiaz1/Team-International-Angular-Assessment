import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import {AppRoutingModule} from './app.routing';
import {EmployeesService} from './services/employees.service';
import {HttpClientModule} from '@angular/common/http';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import {MaterialModule} from './material/material.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmployeesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [EmployeesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
