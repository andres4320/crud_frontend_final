 import { Component } from "@angular/core";
 import { FormsModule } from '@angular/forms';
 import { ApiService } from '../service/api/api.service';
 import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  public email: string = "";
  public password: string = "";

  constructor(private loginService: ApiService, public router: Router) {}
  login() {
    this.loginService.login(this.email, this.password)
      .then((response: any) => {
        console.log("Respuesta del servidor:", response);
        const token = response.token;
        this.loginService.setToken(token);
        this.router.navigateByUrl("/country");
      })
      .catch((error: any) => {
        console.error("Error en la solicitud de inicio de sesión:", error);
      });
  }
}

