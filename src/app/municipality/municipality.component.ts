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
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-municipality',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule, DataTablesModule],
  templateUrl: './municipality.component.html',
  styleUrl: './municipality.component.scss'
})
export class MunicipalityComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
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
  public isDataLoaded: boolean = false;
  public showAddMunicipalityCard: boolean = true;

  constructor(private service: ApiService, private route: ActivatedRoute, private toastrService: ToastrService) { }

  ngOnInit() {
    this.handleQueryParams();
    this.getMunicipality();
    this.getDepartament();
    this.getCountry();
    this.dtOptions = {
      pagingType: 'full_numbers',
      lengthChange: false
    };
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
    } this.isDataLoaded = true;
  }

  onButtonClick() {
    if (this.municipality) {
      this.updateMunicipalitytWS();
    } else {
      this.createMunicipality();
    }
  }

  async createMunicipality() {
    if (!this.departaments_id && !this.municipality) {
      this.toastrService.error('Debe llenar todos los campos para continuar.', 'Error');
    } else {
      const newMunicipality = { name: this.name, departaments_id: this.departaments_id };
      try {
        this.service.createMunicipality('municipalities/create', newMunicipality).then((res) => {
          this.name = '';
          this.country_id = 0;
          this.departaments_id = 0;
          this.getMunicipality();
        });
        this.toastrService.success('El municipio se ha creado exitosamente.', 'Éxito');
      } catch (error) {
        this.toastrService.error('No se puede crear el municipio.', 'Error');
      }
    }
  }

  async update(municipality: any) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.showAddMunicipalityCard = true;
    this.labelMain = "Actualizar";
    this.municipality = municipality;
    this.name = municipality.name;
    this.departaments_id = municipality.departaments_id;
    this.country_id = 0;
  }

  async updateMunicipalitytWS() {
    if (this.country_id === 0 && this.departaments_id === 0) {
      this.toastrService.error('No se puede actualizar el municipio si tanto el país como el municipio están llenos.', 'Error');
      return;
    }
    this.municipality.name = this.name;
    this.municipality.departaments_id = this.departaments_id;
    try {
      await this.service.updateMunicipality('municipalities/update', this.municipality).then((x) => {
        this.municipality = null;
        this.name = "";
        this.departaments_id = 0;
        this.country_id = 0;
        this.getMunicipality();
      });
      this.toastrService.success('El municipio se ha actualizado exitosamente.', 'Éxito');
    } catch (error) {
      this.toastrService.error('No se puede actualizar el municipio.', 'Error');
    }
  }

  async selectCountry() {
    this.departaments_id = 0;
    this.service.getDepartamentByCountry('departaments', this.country_id)
      .then((filteredDepartments) => {
        this.departamentData = filteredDepartments;
      })
  }

  async deleteMunicipality(id: any) {
    try {
      await this.service.deleteMunicipality(id)
      this.getMunicipality()
      this.toastrService.success('El departamento se ha eliminado exitosamente.', 'Éxito');
    } catch (error) {
      this.toastrService.error('No se puede eliminar el departamento.', 'Error');
    }
  }

  private handleQueryParams() {
    this.route.queryParams.subscribe(params => {
      if (params['showAddMunicipalityCard'] === 'false') {
        this.showAddMunicipalityCard = false;
      }
    }).unsubscribe();
  }
}
