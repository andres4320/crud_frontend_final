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
    // Recuperar la preferencia del tema almacenada en localStorage al iniciar el componente
    const storedTheme = localStorage.getItem('darkTheme');
    this.darkTheme = storedTheme === 'true';

    // Aplicar el tema al body
    document.body.classList.toggle('dark-theme', this.darkTheme);
  }

  toggleDarkTheme(): void {
    this.darkTheme = !this.darkTheme;

    // Almacenar la preferencia del tema en localStorage
    localStorage.setItem('darkTheme', this.darkTheme.toString());

    // Aplicar el tema al body
    document.body.classList.toggle('dark-theme', this.darkTheme);
  }

  icon(): string {
    return this.darkTheme ? '🌚' : '🌞';
  }
}
