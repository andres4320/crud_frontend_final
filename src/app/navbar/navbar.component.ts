import { Component, OnInit, Input  } from '@angular/core';
import { LoginService } from '../service/api/login.service';
import { Router } from '@angular/router';
import { LogoutComponent } from '../logout/logout.component';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LogoutComponent, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent implements OnInit {

  constructor(public loginService: LoginService, private router: Router, private toastrService: ToastrService) {}

  public darkTheme = false;
  ngOnInit(): void {
    const storedTheme = localStorage.getItem('darkTheme');
    this.darkTheme = storedTheme === 'true';
    this.setDarkTheme(this.darkTheme);
  }

  toggleDarkTheme(): void {
    this.darkTheme = !this.darkTheme;
    localStorage.setItem('darkTheme', this.darkTheme.toString());
    document.body.classList.toggle('dark-theme', this.darkTheme);
  }

  private setDarkTheme(isDark: boolean): void {
    document.body.classList.toggle('dark-theme', isDark);
    const switchInput = document.querySelector('.switch input');
    if (switchInput) {
      (switchInput as HTMLInputElement).checked = isDark;
    }
  }
  logout() {
    const logoutComponent = new LogoutComponent(this.loginService, this.router, this.toastrService);
    logoutComponent.logout();
  }

  showNavbarItems(): boolean {
    const currentRoute = this.router.url;
    return currentRoute.includes('country') || currentRoute.includes('departament') || currentRoute.includes('municipality');
  }
  noShowItems(): boolean {
    return this.router.url.includes('login') || this.router.url.includes('register');
  }
}
