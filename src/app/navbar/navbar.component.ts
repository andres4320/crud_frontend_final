import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent implements OnInit {
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
}
