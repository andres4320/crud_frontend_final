import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';
import { Country } from '../models/country.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { ToastrService } from 'ngx-toastr';
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, DataTablesModule],
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  dtOptions: DataTables.Settings = {};

  public countryData!: Country[];
  public name: string = '';
  public labelMain: string = 'Agregar';
  public country: any = null;

  constructor(private countryService: ApiService, private router: Router, private toastrService: ToastrService) { }

  ngOnInit() {
    this.getCountry();
    this.dtOptions = {
      pagingType: 'full_numbers', 
      lengthChange: false
    };  
  }

  async getCountry() {
    this.countryData = await this.countryService.getCountry('countries');
  }

  onButtonClick() {
    if (this.country) {
      this.updateCountryWS();
    } else {
      this.createCountry();
    }
  }

  async createCountry() {
    try {
    await this.countryService.createCountry('countries/create', { name: this.name }).then((x) => {
      this.name = "";
      this.getCountry();
    });
    this.toastrService.success('El país se ha creado exitosamente', 'Éxito');
    } catch (error) {
    this.toastrService.error('No se puede crear el país', 'Error');
    }
  }

  async updateCountryWS() {
    this.country.name = this.name;
    try {
    await this.countryService.updateCountry('countries/update', this.country).then((x) => {
      this.country = null;
      this.labelMain = "Agregar";
      this.name = "";
      this.getCountry();
    });
    this.toastrService.success('El país se ha actualizado exitosamente', 'Éxito');
    } catch (error) {
    this.toastrService.error('No se puede actualizar el país', 'Error');
    }
  }

  async updateCountry(country: any) {
    this.labelMain = "Actualizar";
    this.country = country;
    this.name = country.name;
  }

  async deleteCountry(id: any) {
    try {
    await this.countryService.deleteCountry(id);
    this.getCountry();
    this.toastrService.success('El país se ha eliminado exitosamente', 'Éxito');
    } catch (error) {
    this.toastrService.error('No se puede eliminar el país', 'Error');
    }
  }

  async viewDepartament(countryId: any) {
    await this.router.navigate(['/departament'], { queryParams: { countryId: countryId } });
  }  

}
