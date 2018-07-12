import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './pages/home/home.component';
import {NewEmployeeComponent} from './pages/new-employee/new-employee.component';
import {CandeactivateguardService} from './guards/candeactivateguard.service';

const routes: Routes = [
  // full : makes sure the path is absolute path
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'newUser', component: NewEmployeeComponent, canDeactivate: [CandeactivateguardService]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

