import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../service/api/api.service';
import { User } from '../models/user.model';
import Chart from 'chart.js/auto'
import { Router } from "@angular/router";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  public usersByMunicipality: User[] = [];
  public usersByDepartament: User[] = [];
  public chartTitle1: string = '';
  public chartTitle2: string = '';
  public chartTitle3: string = '';
  public chartTitle4: string = '';
  public chartTitle5: string = '';
  
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.chartTitle1 = 'Usuarios por País';
    this.chartTitle2 = 'Usuarios por Departamento';
    this.chartTitle3 = 'Usuarios por Municipio';
    this.chartTitle4 = 'Usuarios por Profesión';
    this.chartTitle5 = 'Usuarios por Género';
    this.getUsersByMunicipality();
    this.getUsersByDepartament();
    this.getUsersByCountry();
    this.getUsersByProfession();
    this.getUsersByGender();

  }
  
  getUsersByMunicipality() {
    this.apiService.getUsersByMunicipality('users/usersByMunicipality')
      .then(data => {
        const ctx = document.getElementById('chart3') as HTMLCanvasElement;
        const chartData = {
          labels: data.map(item => item.name),
          datasets: [{
            label: this.chartTitle3,
            data: data.map(item => item.total),
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              'rgba(153, 102, 255, 0.7)',
            ],
          }]
        };
        const chart = new Chart(ctx, {
          type: 'bar',
          data: chartData,
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      })
      .catch(error => {
        console.error('Error al obtener usuarios por municipio:', error);
      });
  }

  getUsersByDepartament() {
    this.apiService.getUsersByDepartament('users/usersByDepartament')
      .then(data => {
        const ctx = document.getElementById('chart2') as HTMLCanvasElement;
        const chartData = {
          labels: data.map(item => item.name),
          datasets: [{
            label: this.chartTitle2,
            data: data.map(item => item.total),
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              'rgba(153, 102, 255, 0.7)',
            ],
          }]
        };
        const chart = new Chart(ctx, {
          type: 'bar', 
          data: chartData,
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      })
      .catch(error => {
        console.error('Error al obtener usuarios por departamento:', error);
      });
  }

  getUsersByCountry() {
    this.apiService.getUsersByCountry('users/usersByCountry')
      .then(data => {
        const ctx = document.getElementById('chart1') as HTMLCanvasElement;
        const chartData = {
          labels: data.map(item => item.name),
          datasets: [{
            label: this.chartTitle1,
            data: data.map(item => item.total),
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              'rgba(153, 102, 255, 0.7)',
            ],
          }]
        };
        const chart = new Chart(ctx, {
          type: 'bar', 
          data: chartData,
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      })
      .catch(error => {
        console.error('Error al obtener usuarios por país:', error);
      });
  }

  getUsersByProfession() {
    this.apiService.getUsersByProfession('users/usersByProfession')
      .then(data => {
        const ctx = document.getElementById('chart4') as HTMLCanvasElement;
        const chartData = {
          labels: data.map(item => item.name),
          datasets: [{
            label: this.chartTitle4,
            data: data.map(item => item.total),
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              'rgba(153, 102, 255, 0.7)',
            ],
          }]
        };
        const chart = new Chart(ctx, {
          type: 'pie', 
          data: chartData,
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      })
      .catch(error => {
        console.error('Error al obtener usuarios por profesion:', error);
      });
  }

  getUsersByGender() {
    this.apiService.getUsersByGender('users/usersByGender')
      .then(data => {
        const ctx = document.getElementById('chart5') as HTMLCanvasElement;
        const chartData = {
          labels: data.map(item => item.name),
          datasets: [{
            label: this.chartTitle5,
            data: data.map(item => item.total),
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              'rgba(153, 102, 255, 0.7)',
            ],
          }]
        };
        const chart = new Chart(ctx, {
          type: 'pie', 
          data: chartData,
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      })
      .catch(error => {
        console.error('Error al obtener usuarios por género:', error);
      });
  }
}
