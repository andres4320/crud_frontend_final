import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { enviroment } from '../../../enviroments/enviroment';
import { ServiceObject } from '../../models/serviceObject';
import { Login } from '../../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public hideNavbarItems: boolean = false;
  private endpoint = enviroment.api;
  private token: string = "";

  constructor(private httpClient: HttpClient, private cookies: CookieService) { }

  login(user: any): Promise<any> {
    return this.httpClient.post(`${this.endpoint}auth/login`, user).toPromise()
      .then((data: any) => {
        this.setToken(data.token);
        return data;
      });
  }
  
  getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
  }

  setToken(token: string) {
    this.token = token;
    this.cookies.set("token", token);
  }

  getToken(): string {
    if (this.token) {
      return this.token;
    }
    
    this.token = this.cookies.get("token");
    return this.token;
    
  }

  clearToken(): void {
    this.token = "";
    this.cookies.delete("token");
  }

  // getUserDetailsByEmail(email: string): Promise<Login[]> {
  //   return this.httpClient.get(`${this.endpoint}?email=${email}`, { headers: this.getHeaders() })
  //     .toPromise()
  //     .then((res) => {
  //       const service = res as ServiceObject;
  //       return service.data as Login[];
  //     });
  // }

}
