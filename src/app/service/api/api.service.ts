import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceObject } from '../../models/serviceObject';
import { Country } from '../../models/country.model';
import { Departament } from '../../models/departament.model';
import { Municipality } from '../../models/municipality.model';
import { enviroment } from '../../../enviroments/enviroment';
import { CookieService } from "ngx-cookie-service";
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private endpoint = enviroment.api;

  constructor(private httpClient: HttpClient, private cookies: CookieService, private loginService: LoginService) { }

  //Functions of countries
  getCountry(entity: String): Promise<Country[]> {
  return this.httpClient.get(`${this.endpoint}${entity}`, { headers: this.loginService.getHeaders() })
    .toPromise()
    .then((res) => {
      const service = res as ServiceObject;
      return service.data as Country[];
    });
}
  
  createCountry(entity: String, country: Country): Promise<ServiceObject> {
    return this.httpClient.post(`${this.endpoint}${entity}`, country, { headers: this.loginService.getHeaders() })
      .toPromise()
      .then((res) => {
        return res as ServiceObject;
      });
  }

  updateCountry(entity: String, country: Country): Promise<ServiceObject> {
    return this.httpClient.put(`${this.endpoint}${entity}/${country.id}`, country, { headers: this.loginService.getHeaders() })
      .toPromise()
      .then((res) => {
        return res as ServiceObject;
      });
  }

  deleteCountry(id: number): Promise<ServiceObject> {
    return this.httpClient.delete(`${this.endpoint}countries/destroy/${id}`, { headers: this.loginService.getHeaders() })
      .toPromise()
      .then((res) => {
        return res as ServiceObject;
      });
  }

  // Functions of Departaments
  getDepartament(entity: String): Promise<Departament[]> {
    return this.httpClient.get(`${this.endpoint}${entity}`, { headers: this.loginService.getHeaders() })
      .toPromise()
      .then((res) => {
        const service = res as ServiceObject;
        return service.data as Departament[];
      });
  }

  getDepartamentByCountry(entity: string, countryId: number): Promise<Departament[]> {
    return this.httpClient.get(`${this.endpoint}${entity}?countryId=${countryId}`, { headers: this.loginService.getHeaders() })
      .toPromise()
      .then((res) => {
        const service = res as ServiceObject;
        return service.data as Departament[];
      });
  }
  
  createDepartament(entity: String, departament: Departament): Promise<ServiceObject> {
    return this.httpClient.post(`${this.endpoint}${entity}`, departament, { headers: this.loginService.getHeaders() })
      .toPromise()
      .then((res) => {
        return res as ServiceObject;
      });
  }

  updateDepartament(entity: String, departament: Departament): Promise<ServiceObject> {
    return this.httpClient.put(`${this.endpoint}${entity}/${departament.id}`, departament, { headers: this.loginService.getHeaders() })
      .toPromise()
      .then((res) => {
        return res as ServiceObject;
      });
  }

  deleteDepartament(id: number): Promise<ServiceObject> {
    return this.httpClient.delete(`${this.endpoint}departaments/destroy/${id}`, { headers: this.loginService.getHeaders() })
      .toPromise()
      .then((res) => {
        return res as ServiceObject;
      });
  }

  // Functions of Municpalities
  getMunicipality(entity: String): Promise<Municipality[]> {
    return this.httpClient.get(`${this.endpoint}${entity}`, { headers: this.loginService.getHeaders() })
      .toPromise()
      .then((res) => {
        const service = res as ServiceObject;
        return service.data as Municipality[];
      });
  }

  getMunicipalityByDepartament(entity: string, departamentId: number): Promise<Municipality[]> {
    return this.httpClient.get(`${this.endpoint}${entity}?departamentId=${departamentId}`, { headers: this.loginService.getHeaders() })
      .toPromise()
      .then((res) => {
        const service = res as ServiceObject;
        return service.data as Municipality[];
      });
  }

  createMunicipality(entity: String, municipality: Municipality): Promise<ServiceObject> {
    return this.httpClient.post(`${this.endpoint}${entity}`, municipality, { headers: this.loginService.getHeaders() })
      .toPromise()
      .then((res) => {
        return res as ServiceObject;
      });
  }

  updateMunicipality(entity: String, municipality: Municipality): Promise<ServiceObject> {
    return this.httpClient.put(`${this.endpoint}${entity}/${municipality.id}`, municipality, { headers: this.loginService.getHeaders() })
      .toPromise()
      .then((res) => {
        return res as ServiceObject;
      });
  }

  deleteMunicipality(id: number): Promise<ServiceObject> {
    return this.httpClient.delete(`${this.endpoint}municipalities/destroy/${id}`, { headers: this.loginService.getHeaders() })
      .toPromise()
      .then((res) => {
        return res as ServiceObject;
      });
  }
  
  //Login

}
