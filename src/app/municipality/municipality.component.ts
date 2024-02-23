import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ApiService } from '../service/api/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
// import { Router } from '@angular/router';
// import { DepartamentComponent } from '../departament/departament.component';
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
  public departament_id: number = 0;
  public municipality_id: number = 0;
  public country: any = null;
  public departament: any = null;
  public municipality: any = null;
  public name: string = '';
  public labelMain: string = 'Agregar';

  constructor(private service: ApiService,  private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.getDepartament();
    this.getCountry();
    // this.getMunicipality();
  }

  // async getMunicipality() {
  //   const countryId = this.route.snapshot.queryParams['countryId'];
  //   console.log(countryId);
  //   if (countryId) {
  //     this.departamentData = await this.service.getDepartamentByCountry('departaments', countryId);
  //   } else {
  //     this.departamentData = await this.service.getDepartament('departaments');
  //   }
  //   console.log('Departament data:', this.departamentData);
  // }

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
      // this.createMunicipality();
    }
  }

  // async createMunicipality() {
  //   console.log('entra');
  //   const newMunicipality = { name: this.name, departament_id: this.departament_id };

  //   this.service.createMunicipality('municipalities/create', newMunicipality).then((res) => {
  //     console.log('Municipio creado exitosamente:', res);
  //     this.name = '';
  //     this.departament_id = 0;
  //     // this.getMunicipality();
  //   });
  // }

  async updateMunicipalitytWS() {
    this.municipality.name = this.name;
    this.municipality.departament.id = this.departament_id;

    if (this.municipality.country.id !== this.country_id) {
      await this.service.updateCountry('countries/update', this.country).then((x) => {
        console.log('País actualizado:', x);
        this.country = null;
      });
    }

    if (this.municipality.departament.id !== this.departament_id) {
      await this.service.updateDepartament('departaments/update', this.departament).then((x) => {
        console.log('Departamento actualizado:', x);
        this.departament = null;
      });
    }

    await this.service.updateMunicipality('municipalities/update', this.municipality).then((x) => {
      this.municipality = null;
      this.name = "";
      this.departament_id = 0;
      // this.getMunicipality();
    });
  }

  async update(municipality: any) {
    this.labelMain = "Actualizar";
    this.municipality = municipality;
    this.name = municipality.name;
    this.country_id = municipality.country.id;
  }

  // async getMunicipalityDetails() {
  //   const municipioActual = this.municipalityData.find(dep => dep.id === this.municpality_id);
  //   console.log(municipioActual);
  //   if (municipioActual) {
  //     this.name = municipioActual.name;
  //     this.country_id = municipioActual.country_id;
  //   }
  // }

  async deleteMunicipality(id: any) {
    await this.service.deleteMunicipality(id)
    // this.getMunicipality()
  }
}
