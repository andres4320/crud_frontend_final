import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { enviroment } from '../../../enviroments/enviroment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

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
    console.log(Headers)
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
  }

  register(user: any): Observable<any> {
    return this.httpClient.post(`${this.endpoint}auth/register`, user);
  }

  setToken(token: string) {
    this.token = token;
    this.cookies.set("token", token);
  }

  getToken(): string {
    if (this.token) {
      return this.token;
    }
    
    console.log(this.token)
    this.token = this.cookies.get("token");
    return this.token;
    
  }

  clearToken(): void {
    this.token = "";
    this.cookies.delete("token");
  }

}
