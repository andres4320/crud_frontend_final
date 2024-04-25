import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  login(user: any): Observable<any> {
    return this.httpClient.post("https://reqres.in/api/login", user);
  }

  register(user: any): Observable<any> {
    return this.httpClient.post("https://reqres.in/api/register", user);
  }

}
