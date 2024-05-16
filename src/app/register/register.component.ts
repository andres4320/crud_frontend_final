import { Component, ViewChild  } from '@angular/core';
import { Router } from "@angular/router";
import { FormsModule, NgForm } from '@angular/forms';
import { RegisterService } from '../service/api/register.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { ApiService } from '../service/api/api.service';
import { LoginService } from '../service/api/login.service';
import { Country } from '../models/country.model';
import { Departament } from '../models/departament.model';
import { Municipality } from '../models/municipality.model';
import { Profession } from '../models/profession.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Gender } from '../models/gender.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NavbarComponent, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  @ViewChild('form') form?: NgForm;
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
  public hideNavbarItems: boolean = true;
  public passwordsMatch: boolean = true;
  public passwordLengthValid: boolean = true;
  public emailValid: boolean = true;
  public countryData: Country[] = [];
  public departamentData: Departament[] = [];
  public municipalityData: Municipality[] = [];
  public genderData: Gender[] = [];
  public professionData: Profession[] = [];

  constructor(private registerService: RegisterService, private service: ApiService, private loginService: LoginService, public router: Router, private route: ActivatedRoute, private toastrService: ToastrService) {}

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

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  register() {
    if (this.name == "" || this.email == "" || this.password == "" || this.password_confirmation == "") {
      this.toastrService.error('Debes llenar todos los campos.', 'Error');
    } else if (this.password.length < 8) {
      this.passwordLengthValid = false;
    }
    else if (this.password !== this.password_confirmation) {
      this.passwordsMatch = false;
    } else if (!this.isValidEmail(this.email)) {
      this.emailValid = false;
     } else {
      this.passwordsMatch = true;
      this.passwordLengthValid = true;
      this.emailValid = true;
    const user = {
      name: this.name,
      gender_id: this.gender_id,
      profession_id: this.profession_id,
      municipality_id: this.municipality_id,
      email: this.email,
      password: this.password,
      password_confirmation: this.password_confirmation,

    };

    this.registerService.register(user).subscribe(
      (response) => {
        this.toastrService.success('Usuario creado correctamente', 'Éxito');
        this.router.navigateByUrl('/login');
      },
      (error) => {
        this.toastrService.error('El correo ingresado, esta en uso.', 'Error');
      }
    );

    
    }
  }

  async selectCountry() {
    this.departaments_id = 0;
    this.municipality_id = 0;
    this.service.getDepartamentByCountry('departaments', this.country_id)
      .then((filteredDepartments) => {
        this.departamentData = filteredDepartments;
      })
  }

  async selectDepartament() {
    this.municipality_id = 0;
    this.service.getMunicipalityByDepartament('municipalities', this.departaments_id)
      .then((filteredMunicipalities) => {
        this.municipalityData = filteredMunicipalities;
      })
  }

  toggleNavbarItemsVisibility() {
    this.loginService.hideNavbarItems = true;
  }

  isRegisterPage(): boolean {
    return this.router.url.includes('register');
  }

  
}
