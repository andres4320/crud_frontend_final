import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { RegisterService } from '../service/api/register.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { ApiService } from '../service/api/api.service';
import { Country } from '../models/country.model';
import { Departament } from '../models/departament.model';
import { Municipality } from '../models/municipality.model';
import { Profession } from '../models/profession.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Gender } from '../models/gender.model';

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
  public profession_id: number = 0;
  public gender_id: number = 0;
  public countryData: Country[] = [];
  public departamentData: Departament[] = [];
  public municipalityData: Municipality[] = [];
  public genderData: Gender[] = [];
  public professionData: Profession[] = [];

  constructor(private registerService: RegisterService, private service: ApiService, public router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getGender();
    this.getProfession();
    this.getMunicipality();
    this.getDepartament();
    this.getCountry();
  }

  async getCountry() {
    this.countryData = await this.service.getCountry('countries');
  }

  async getProfession() {
    this.professionData = await this.registerService.getProfession('professions');
  }
  async getGender() {
    this.genderData = await this.registerService.getGender('genders');
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
      gender_id: this.gender_id,
      profession_id: this.profession_id,
      municipality_id: this.municipality_id,
      email: this.email,
      password: this.password,
      password_confirmation: this.password_confirmation,

    };

    console.log("gender", this.gender_id)
    console.log("profesion id", this.profession_id)


    this.registerService.register(user).subscribe(
      (response) => {
        console.log('Registro exitoso:', response);
        console.log("Usuario", user);
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
