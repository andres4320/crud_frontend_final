import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Country } from '../models/country.model';
import { Departament } from '../models/departament.model';


@Component({
  selector: 'app-departament-update',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './departament-update.component.html',
  styleUrl: './departament-update.component.scss'
})
export class DepartamentUpdateComponent {
  public countryData: Country[] = [];
  public departamentActually: Departament[] = [];
  public name: string = '';
  public departament_id: number = 0;
  public country_id: number = 0;



  constructor(private departamentService: ApiService, private route: ActivatedRoute, private router: Router) { }

  async ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.departament_id = Number(params.get('id'));
    });
    await this.getCountry();
    await this.getDepartament();
    // await this.getDepartamentDetails(); // Obtener detalles del departamento

  }

  async getCountry() {
    this.countryData = await this.departamentService.getCountry('countries');
  }

  async getDepartament() {
    this.departamentActually = await this.departamentService.getDepartamentById('departaments', this.departament_id);
    console.log('Departament data:', this.departamentActually);

    if (this.departamentActually) {
      this.name = this.departamentActually[0].name; 
      this.country_id = this.departamentActually[0].country_id;
    }
    
  }


  async updateDepartament() {
    await this.departamentService.updateDepartament('departaments/update', {
      name: this.name, id: this.departament_id,
      country_id: 0
    });
    this.router.navigate(['departament']);
  } 
}
