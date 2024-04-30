import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from "@angular/common/http";
import { Observable } from "rxjs";
import { enviroment } from '../../../enviroments/enviroment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private endpoint = enviroment.api+ 'auth/register';

  constructor(private httpClient: HttpClient) { }

  register(user: any): Observable<any> {
    return this.httpClient.post(this.endpoint, user).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 422) {
          // Manejar los errores de validación
          console.error('Errores de validación:', error.error);
        } else {
          // Manejar otros errores
          console.error('Error en el registro:', error);
        }
        return throwError(error);
      })
    );
  }
  
}
