import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceObject } from '../../models/serviceObject';
import { Country } from '../../models/country.model';
import { Departament } from '../../models/departament.model';
import { Municipality } from '../../models/municipality.model';
import { enviroment } from '../../../enviroments/enviroment';
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private endpoint = enviroment.api;

  constructor(private httpClient: HttpClient, private cookies: CookieService) { }

  //Functions of countries
  getCountry(entity: String): Promise<Country[]> {
    return this.httpClient.get(`${this.endpoint}${entity}`).toPromise().then((res) => {
      var service = <ServiceObject>res
      return <Country[]>service.data;
    })
  }
  
  createCountry(entity: String, country: Country): Promise<ServiceObject> {
    return this.httpClient.post(`${this.endpoint}${entity}`, country).toPromise().then((res) => {
      return <ServiceObject>res;
    })
  }

  updateCountry(entity: String, country: Country): Promise<ServiceObject> {
    return this.httpClient.put(`${this.endpoint}${entity}/${country.id}`, country).toPromise().then((res) => {
      return <ServiceObject>res;
    })
  }

  deleteCountry(id: number): Promise<ServiceObject> {
    return this.httpClient.delete(`${this.endpoint}countries/destroy/${id}`).toPromise().then((res) => {
      return <ServiceObject>res;
    })
  }

  // Functions of Departaments
  getDepartament(entity: String): Promise<Departament[]> {
    return this.httpClient.get(`${this.endpoint}${entity}`).toPromise().then((res) => {
      var service = <ServiceObject>res
      return <Departament[]>service.data;
    })
  }

  getDepartamentByCountry(entity: string, countryId: number): Promise<Departament[]> {
    return this.httpClient.get(`${this.endpoint}${entity}?countryId=${countryId}`).toPromise().then((res) => {
      var service = <ServiceObject>res
      return <Departament[]>service.data;
    });
  }
  
  createDepartament(entity: String, departament: Departament): Promise<ServiceObject> {
    return this.httpClient.post(`${this.endpoint}${entity}`, departament).toPromise().then((res) => {
      return <ServiceObject>res;
    })
  }

  updateDepartament(entity: String, departament: Departament): Promise<ServiceObject> {
    return this.httpClient.put(`${this.endpoint}${entity}/${departament.id}`, departament).toPromise().then((res) => {
      return <ServiceObject>res;
    })
  }

  deleteDepartament(id: number): Promise<ServiceObject> {
    return this.httpClient.delete(`${this.endpoint}departaments/destroy/${id}`).toPromise().then((res) => {
      return <ServiceObject>res;
    })
  }

  // Functions of Municpalities
  getMunicipality(entity: String): Promise<Municipality[]> {
    return this.httpClient.get(`${this.endpoint}${entity}`).toPromise().then((res) => {
      var service = <ServiceObject>res
      return <Municipality[]>service.data;
    })
  }

  getMunicipalityByDepartament(entity: string, departamentId: number): Promise<Municipality[]> {
    return this.httpClient.get(`${this.endpoint}${entity}?departamentId=${departamentId}`).toPromise().then((res) => {
      var service = <ServiceObject>res
      return <Municipality[]>service.data;
    });
  }

  async createMunicipality(entity: String, municipality: Municipality): Promise<ServiceObject> {
    return this.httpClient.post(`${this.endpoint}${entity}`, municipality).toPromise().then((res) => {
      return <ServiceObject>res;
    })
  }

  updateMunicipality(entity: String, municipality: Municipality): Promise<ServiceObject> {
    return this.httpClient.put(`${this.endpoint}${entity}/${municipality.id}`, municipality).toPromise().then((res) => {
      return <ServiceObject>res;
    })
  }

  deleteMunicipality(id: number): Promise<ServiceObject> {
    return this.httpClient.delete(`${this.endpoint}municipalities/destroy/${id}`).toPromise().then((res) => {
      return <ServiceObject>res;
    })
  }
  
  //Login

  login(email: string, password: string): Promise<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<any>(`${this.endpoint}login`, { email, password }, { headers }).toPromise().then((res) => {
      if (res && res.token) {
        this.setToken(res.token); // Almacena el token JWT
      }
      return res; // Devuelve la respuesta completa
    });
  }
  setToken(token: string) {
    this.cookies.set("token", token);
  }
  getToken() {
    return this.cookies.get("token");
  }
}
