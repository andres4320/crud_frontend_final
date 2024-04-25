import { Component } from '@angular/core';
import { LoginService } from '../service/api/login.service';

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

  constructor(public loginService: LoginService) {}

  register() {
    console.log(this.email);
    console.log(this.password);
  }
}
