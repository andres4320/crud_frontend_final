import { Component } from '@angular/core';
import { LoginService } from '../service/api/login.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  public email: string = "";
  public password: string = "";
  public confirmPassword: string = "";

  constructor(public loginService: LoginService, public router: Router) {}

  register() {
    const user = { email: this.email, password: this.password };
    this.loginService.register(user).subscribe(data => {
      this.loginService.setToken(data.token);
      this.router.navigateByUrl('/');
    },
    error => {
      console.log(error);
    });
  }
}
