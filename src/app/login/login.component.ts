 import { Component } from "@angular/core";
 import { FormsModule } from '@angular/forms';
 import { LoginService } from '../service/api/login.service';
 import { NavbarComponent } from '../navbar/navbar.component';
 import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [FormsModule, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  public email: string = "";
  public password: string = "";
  public hideNavbarItems: boolean = true;
  public rememberMe: boolean = false;

  constructor(private loginService: LoginService, public router: Router) {}

  ngOnInit() {
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
      const user = JSON.parse(rememberedUser);
      this.email = user.email;
      this.password = user.password;
      this.rememberMe = true;
    }
  }

  login() {
    const user = { email: this.email, password: this.password };
    
    this.loginService.login(user)
      .then(data => {
        this.loginService.setToken(data.token);
        if (this.rememberMe) {
          localStorage.setItem('rememberedUser', JSON.stringify(user));
        } else {
          localStorage.removeItem('rememberedUser');
        }
        this.router.navigateByUrl("/");
      })
      .catch(error => {
        console.error(error);
      });
  }


  toggleNavbarItemsVisibility() {
    this.loginService.hideNavbarItems = true;
  }
  
}

