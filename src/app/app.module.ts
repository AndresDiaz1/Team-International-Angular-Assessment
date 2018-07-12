import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import {AppRoutingModule} from './app.routing';
import {EmployeesService} from './services/employees/employees.service';
import {HttpClientModule} from '@angular/common/http';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import {MaterialModule} from './material/material.module';
import {CalculateAgeService} from './miscellaneous/calculate-age.service';
import { StoreModule} from '@ngrx/store';
import { EffectsModule} from '@ngrx/effects';
import { reducers, effects } from './store';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CountryService} from './services/country/country.service';
import { JobTitleComponent } from './components/job-title/job-title.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmployeesListComponent,
    EmployeeFormComponent,
    JobTitleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects)
  ],
  providers: [EmployeesService, CalculateAgeService, CountryService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
