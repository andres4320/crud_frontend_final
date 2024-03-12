import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ApiService } from '../service/api/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Country } from '../models/country.model';
import { Departament } from '../models/departament.model';
import { Municipality } from '../models/municipality.model';
import { ToastrService } from 'ngx-toastr';


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

  constructor(private service: ApiService,  private route: ActivatedRoute, private toastrService: ToastrService) { }
  
  ngOnInit() {
    this.getMunicipality();
    this.getDepartament();
    this.getCountry();
  }

  async getCountry() {
    this.countryData = await this.service.getCountry('countries');
  }

  async getDepartament() {
    this.departamentData = await this.service.getDepartament('departaments');
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

  onButtonClick() {
    if (this.municipality) {
      this.updateMunicipalitytWS();
    } else {
      this.createMunicipality();
    }
  }

  async createMunicipality() {
    console.log('Entra a crear');
    console.log('Valor de departaments_id:', this.departaments_id);
    if(!this.departaments_id){
      this.toastrService.error('Debe seleccionar un departamento', 'Error');
    } else {
      const newMunicipality = { name: this.name, departaments_id: this.departaments_id };
      console.log('Arreglo de Municipios',newMunicipality);
      try {
      this.service.createMunicipality('municipalities/create', newMunicipality).then((res) => {
        console.log('Municipio creado exitosamente:', res);
        this.name = '';
        this.country_id = 0;
        this.departaments_id = 0;
        this.getMunicipality();
      });
      this.toastrService.success('El municipio se ha creado exitosamente', 'Éxito');
      } catch (error) {
      this.toastrService.error('No se puede crear el municipio', 'Error');
      }
    }
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
    try {
    await this.service.updateMunicipality('municipalities/update', this.municipality).then((x) => {
      this.municipality = null;
      this.name = "";
      this.departaments_id = 0;
      this.country_id = 0;
      this.getMunicipality();
    });
    this.toastrService.success('El municipio se ha actualizado exitosamente', 'Éxito');
    } catch (error) {
    this.toastrService.error('No se puede actualizar el municipio', 'Error');
    }
  }

  async selectCountry() {
    // this.departaments_id = 0;
    this.service.getDepartamentByCountry('departaments', this.country_id)
      .then((filteredDepartments) => {
        this.departamentData = filteredDepartments;
        console.log('Selecciono el pais',this.departamentData, this.departaments_id);
      })
  }

  async deleteMunicipality(id: any) {
    try {
    await this.service.deleteMunicipality(id)
    this.getMunicipality()
    this.toastrService.success('El departamento se ha eliminado exitosamente', 'Éxito');
    } catch (error) {
    this.toastrService.error('No se puede eliminar el departamento', 'Error');
    }
  }
}
