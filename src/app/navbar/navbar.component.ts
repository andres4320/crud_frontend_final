import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/api/login.service';
import { Router } from '@angular/router';
import { LogoutComponent } from '../logout/logout.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LogoutComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) {}

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
    const logoutComponent = new LogoutComponent(this.loginService, this.router);
    logoutComponent.logout();
  }
}
