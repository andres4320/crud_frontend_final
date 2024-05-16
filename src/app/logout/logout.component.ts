import { Component } from "@angular/core";
import { LoginService } from '../service/api/login.service';
import { Router } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  
  constructor(private loginService: LoginService, public router: Router, private toastrService: ToastrService) {}

  logout() {
    try {
      this.loginService.clearToken();
      this.router.navigateByUrl("/login");
      this.toastrService.info('Has cerrado sesión.', '¡Hasta Pronto!');
    } catch (error) {
      this.toastrService.error('No se pudo cerrar sesión. Por favor, inténtalo de nuevo.', 'Error');
      console.error(error);
    }
  }
  
}