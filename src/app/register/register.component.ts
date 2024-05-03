import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { RegisterService } from '../service/api/register.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { ApiService } from '../service/api/api.service';
import { Country } from '../models/country.model';
import { Departament } from '../models/departament.model';
import { Municipality } from '../models/municipality.model';import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NavbarComponent, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  public name: string = "";
  public gender: string = "";
  public profession: string = "";
  public country: string = "";
  public department: string = "";
  public municipality: string = "";
  public email: string = "";
  public password: string = "";
  public password_confirmation: string = "";
  public country_id: number = 0;
  public departaments_id: number = 0;
  public municipality_id: number = 0;
  public countryData: Country[] = [];
  public departamentData: Departament[] = [];
  public municipalityData: Municipality[] = [];
  public isDataLoaded: boolean = false;

  constructor(private registerService: RegisterService, private service: ApiService, public router: Router, private route: ActivatedRoute) {}

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
    this.municipalityData = await this.service.getMunicipality('municipalities');
  }

  register() {
    const user = {
      name: this.name,
      gender: this.gender,
      profession: this.profession,
      municipality_id: this.municipality_id,
      email: this.email,
      password: this.password,
      password_confirmation: this.password_confirmation,

    };

    console.log('Municipality ID:', this.municipality_id); // Imprime el valor de municipality_id

    this.registerService.register(user).subscribe(
      (response) => {
        console.log('Registro exitoso:', response);
        this.router.navigateByUrl('/login');
      },
      (error) => {
        console.error('Error en el registro:', error);
      }
    );
  }

  async selectCountry() {
    this.service.getDepartamentByCountry('departaments', this.country_id)
      .then((filteredDepartments) => {
        this.departamentData = filteredDepartments;
      })
  }

  async selectDepartament() {
    this.service.getMunicipalityByDepartament('municipalities', this.departaments_id)
      .then((filteredMunicipalities) => {
        this.municipalityData = filteredMunicipalities;
      })
  }
}
