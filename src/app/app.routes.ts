import { Routes } from '@angular/router';
import { CountryComponent } from './country/country.component';
import { DepartamentComponent } from './departament/departament.component';
import { MunicipalityComponent } from './municipality/municipality.component';
import { DepartamentUpdateComponent } from './departament-update/departament-update.component';
// import { MunicipalityUpateComponent } from './municipality-upate/municipality-upate.component';


export const routes: Routes = [
    { path: '', redirectTo: 'country', pathMatch: 'full' },
    {path: 'country',component: CountryComponent},
    { path: 'departament', component: DepartamentComponent },
    { path: 'municipality', component: MunicipalityComponent },
];