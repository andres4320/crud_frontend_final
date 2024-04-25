 import { Component } from "@angular/core";
 import { FormsModule } from '@angular/forms';
 import { LoginService } from '../service/api/login.service';
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

  constructor(private loginService: LoginService, public router: Router) {}

  login() {
    const user = { email: this.email, password: this.password };
    this.loginService.login(user).subscribe((data) => {
      console.log(data);
    });
  }
  
}

