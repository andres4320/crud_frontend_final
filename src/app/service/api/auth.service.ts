// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { tap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   private token: string | null = null;

//   constructor(private http: HttpClient) { }

//   login(email: string, password: string) {
//     return this.http.post('https://tu-dominio.com/api/login', { email, password })
//       .pipe(
//         tap((response: any) => {
//           this.token = response.token;
//           localStorage.setItem('token', this.token);
//         })
//       );
//   }

//   logout() {
//     this.token = null;
//     localStorage.removeItem('token');
//   }

//   isAuthenticated(): boolean {
//     return !!this.token;
//   }

//   getToken() {
//     return this.token;
//   }
// }