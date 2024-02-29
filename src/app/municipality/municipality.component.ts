import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ApiService } from '../service/api/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Country } from '../models/country.model';
import { Departament } from '../models/departament.model';
import { Municipality } from '../models/municipality.model';

@Component({
  selector: 'app-municipality',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule],
  templateUrl: './municipality.component.html',
  styleUrl: './municipality.component.scss'
})
export class MunicipalityComponent implements OnInit {

  public countryData: Country[] = [];
  public departamentData: Departament[] = [];
  public municipalityData: Municipality[] = [];
  public country_id: number = 0;
  public departaments_id: number = 0;
  public municipality_id: number = 0;
  public country: any = null;
  public departament: any = null;
  public municipality: any = null;
  public name: string = '';
  public labelMain: string = 'Agregar';

  public filteredDepartments: any = null;

  constructor(private service: ApiService,  private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.getMunicipality();
    this.getDepartament();
    this.getCountry();
  }

  async getMunicipality() {
    const departamentId = this.route.snapshot.queryParams['departamentId'];
    if (departamentId) {
      this.municipalityData = await this.service.getMunicipalityByDepartament('municipalities', departamentId);
    } else {
      this.municipalityData = await this.service.getMunicipality('municipalities');
    }
    console.log('Municipality data:', this.municipalityData);
  }

  async getCountry() {
    this.countryData = await this.service.getCountry('countries');
  }

  async getDepartament() {
    this.departamentData = await this.service.getDepartament('departaments');
  }

  onButtonClick() {
    if (this.municipality) {
      this.updateMunicipalitytWS();
    } else {
      this.createMunicipality();
    }
  }

  async createMunicipality() {
    console.log('entra');
    const newMunicipality = { name: this.name, departaments_id: this.departaments_id };
    
    this.service.createMunicipality('municipalities/create', newMunicipality).then((res) => {
      console.log('Municipio creado exitosamente:', res);
      this.name = '';
      this.country_id = 0;
      this.departaments_id = 0;
      this.getMunicipality();
    });
  }
  
  async update(municipality: any) {
    this.labelMain = "Actualizar";
    this.municipality = municipality;
    this.name = municipality.name;
    this.country_id = municipality.departament.country.id;
    this.departaments_id = municipality.departaments_id;
    console.log('uno', this.departaments_id);
  }

  async updateMunicipalitytWS() {
    this.municipality.name = this.name;
    this.municipality.departaments_id = this.departaments_id;
    console.log('dos', this.municipality.departaments_id);

    await this.service.updateMunicipality('municipalities/update', this.municipality).then((x) => {
      this.municipality = null;
      this.name = "";
      this.departaments_id = 0;
      this.country_id = 0;
      this.getMunicipality();
    });
  }

  async selectCountry() {
    this.service.getDepartamentByCountry('departaments', this.country_id)
      .then((filteredDepartments) => {
        this.departamentData = filteredDepartments;
        // Puedes reiniciar el valor seleccionado en el segundo select si lo deseas
        this.departaments_id = 0;
      })
      .catch((error) => {
        console.error('Error al obtener departamentos filtrados:', error);
      });
  }

  async deleteMunicipality(id: any) {
    await this.service.deleteMunicipality(id)
    this.getMunicipality()
  }
}
