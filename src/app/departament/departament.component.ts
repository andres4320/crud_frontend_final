import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';
import { Country } from '../models/country.model';
import { Departament } from '../models/departament.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-departament',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './departament.component.html',
  styleUrl: './departament.component.scss'
})
export class DepartamentComponent implements OnInit {

  public departamentData: Departament[] = [];
  public countryData: Country[] = [];
  public name: string = '';
  public country_id: number = 0;
  public departaments_id: number = 0;
  public departament: any = null;
  public country: any = null;
  public labelMain: string = 'Agregar';

  constructor(private service: ApiService,  private route: ActivatedRoute, private router: Router, private toastrService: ToastrService) { }

  ngOnInit() {
    this.getDepartament();
    this.getCountry();
  }

  async getDepartament() {
    const countryId = this.route.snapshot.queryParams['countryId'];
    if (countryId) {
      this.departamentData = await this.service.getDepartamentByCountry('departaments', countryId);
    } else {
      this.departamentData = await this.service.getDepartament('departaments');
    }
  }

  async getCountry() {
    this.countryData = await this.service.getCountry('countries');
  }

  onButtonClick() {
    if (this.departament) {
      this.updateDepartamentWS();
    } else {
      this.createDepartament();
    }
  }

  async createDepartament() {
    const newDepartament = { name: this.name, country_id: this.country_id };
    try {
    await this.service.createDepartament('departaments/create', newDepartament).then((res) => {
      this.name = '';
      this.country_id = 0;
      this.getDepartament(); 
    });
    this.toastrService.success('El departamento se ha creado exitosamente', 'Éxito');
    } catch (error) {
    this.toastrService.error('No se puede crear el departamento', 'Error');
    }
  }
  
  async update(departament: any) {
    this.labelMain = "Actualizar";
    this.departament = departament;
    this.name = departament.name;
    this.country_id = departament.country_id;
  }

  async updateDepartamentWS() {
    this.departament.name = this.name;
    this.departament.country_id = this.country_id; 
    
    await this.update(this.departament);
    try {
    await this.service.updateDepartament('departaments/update', this.departament).then((x) => {
      this.departament = null;
      this.name = "";
      this.country_id = 0;
      this.getDepartament();
    });
    this.toastrService.success('El departamento se ha actualizado exitosamente', 'Éxito');
    } catch (error) {
    this.toastrService.error('No se puede actualizar el departamento', 'Error');
    }
  }
  
  async deleteDepartament(id: any) {
    try {
    await this.service.deleteDepartament(id)
    this.getDepartament()
    this.toastrService.success('El departamento se ha eliminado exitosamente', 'Éxito');
    } catch (error) {
    this.toastrService.error('No se puede eliminar el departamento', 'Error');
    }
  }

  async viewMunicipality(departamentId: any) {
    await this.router.navigate(['/municipality'], { queryParams: { departamentId: departamentId } });
  }
}
