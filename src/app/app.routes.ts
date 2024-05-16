import { Routes } from '@angular/router';
import { CountryComponent } from './country/country.component';
import { DepartamentComponent } from './departament/departament.component';
import { MunicipalityComponent } from './municipality/municipality.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'country', component: CountryComponent, canActivate: [AuthGuard] },
  { path: 'departament', component: DepartamentComponent, canActivate: [AuthGuard] },
  { path: 'municipality', component: MunicipalityComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
];

export { routes }; 
