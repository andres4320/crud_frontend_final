import { Component } from "@angular/core";
import { LoginService } from '../service/api/login.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  
  constructor(private loginService: LoginService, public router: Router) {}

  logout() {
    this.loginService.clearToken();
    this.router.navigateByUrl("/login");
  }
}