import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import {AppRoutingModule} from './app.routing';
import {EmployeesService} from './services/employees.service';
import {HttpClientModule} from '@angular/common/http';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import {MaterialModule} from './material/material.module';
import {CalculateAgeService} from './miscellaneous/calculate-age.service';
import { StoreModule} from '@ngrx/store';
import { reducers } from './store';

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
    MaterialModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [EmployeesService, CalculateAgeService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
