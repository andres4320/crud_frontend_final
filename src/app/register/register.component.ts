import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { RegisterService } from '../service/api/register.service';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NavbarComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  public name: string = "";
  public gender: string = "";
  public profession: string = "";
  public country: string = "";
  public department: string = "";
  public municipality: string = "";
  public email: string = "";
  public password: string = "";
  public confirmPassword: string = "";

  constructor(private registerService: RegisterService, public router: Router) {}

  register() {
    const user = {
      name: this.name,
      gender: this.gender,
      profession: this.profession,
      country: this.country,
      department: this.department,
      municipality: this.municipality,
      email: this.email,
      password: this.password
    };

    this.registerService.register(user).subscribe(
      (response) => {
        console.log('Registro exitoso:', response);
        this.router.navigateByUrl('/login');
      },
      (error) => {
        console.error('Error en el registro:', error);
      }
    );
  }
}
