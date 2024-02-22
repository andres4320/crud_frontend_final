import { Component, Input } from '@angular/core';
import { DepartamentComponent } from '../departament/departament.component';
import { NavbarComponent } from '../navbar/navbar.component';
// import { CountryModule } from '../country/country.module';  // Importa el módulo en lugar del componente

@Component({
  selector: 'app-municipality',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './municipality.component.html',
  styleUrl: './municipality.component.scss'
})
export class MunicipalityComponent {
  
}
