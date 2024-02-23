import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';
import { Country } from '../models/country.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  public countryData!: Country[];
  public name: string = '';
  public labelMain: string = 'Agregar';
  public country: any = null;
  // public countryId: number = 0;
  // public updating: boolean = false;

  constructor(private countryService: ApiService, private router: Router) { }

  ngOnInit() {
    this.getCountry();
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
    await this.countryService.createCountry('countries/create', { name: this.name }).then((x) => {
      this.name = "";
      this.getCountry();
    });
  }

  async updateCountryWS() {
    this.country.name = this.name;
    await this.countryService.updateCountry('countries/update', this.country).then((x) => {
      this.country = null;
      this.labelMain = "Agregar";
      this.name = "";
      this.getCountry();
    });
  }

  async updateCountry(country: any) {
    this.labelMain = "Actualizar";
    this.country = country;
    this.name = country.name;
  }

  async deleteCountry(id: any) {
    await this.countryService.deleteCountry(id)
    this.getCountry()
  }

  async viewDepartament(countryId: any) {
    // await this.router.navigate(['/departament']);
    await this.router.navigate(['/departament'], { queryParams: { countryId: countryId } });
  }
}
