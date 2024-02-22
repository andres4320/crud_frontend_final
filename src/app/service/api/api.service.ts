import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceObject } from '../../models/serviceObject';
import { Country } from '../../models/country.model';
import { Departament } from '../../models/departament.model';
import { enviroment } from '../../../enviroments/enviroment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private endpoint = enviroment.api;

  constructor(private httpClient: HttpClient) { }

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

  getDepartamentById(entity: String, id: number): Promise<Departament[]> {
    return this.httpClient.get(`${this.endpoint}${entity}/${id}`).toPromise().then((res) => {
      var service = <ServiceObject>res
      return <Departament[]>service.data;
    })
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
  
}
