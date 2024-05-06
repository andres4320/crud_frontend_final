import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from "@angular/common/http";
import { Observable } from "rxjs";
import { enviroment } from '../../../enviroments/enviroment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Profession } from '../../models/profession.model';
import { Gender } from '../../models/gender.model';
import { ServiceObject } from '../../models/serviceObject';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private endpoint = enviroment.api;

  constructor(private httpClient: HttpClient) { }

  register(user: any): Observable<any> {
    return this.httpClient.post(`${this.endpoint}auth/register`, user).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 422) {
          console.error('Errores de validación:', error.error);
        } else {
          console.error('Error en el registro:', error);
        }
        return throwError(error);
      })
    )
  }

  async getProfession(entity: string): Promise<Profession[]> {
    const res = await this.httpClient.get(`${this.endpoint}${entity}`)
      .toPromise();
    const service = res as ServiceObject;
    return service.data as Profession[];
  }

  async getGender(entity: string): Promise<Gender[]> {
    const res = await this.httpClient.get(`${this.endpoint}${entity}`)
      .toPromise();
    const service = res as ServiceObject;
    return service.data as Gender[];
  }
}
