import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router:Router) { }
  // url = 'https://talabat-backend.herokuapp.com';
  private url = 'http://localhost:9000'

  getUrl():string {
    return this.url;
  }

  login(username: string, password: string) {

    // let header = new HttpHeaders().set("Authorization", localStorage.getItem('token'));

    let body = {
      "username": username,
      "password": password

    }
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    }
    return this.http.post(this.url + '/users/login', body, httpOptions)
  }

  register(customer: Customer) {

    // let header = new HttpHeaders().set("Authorization", localStorage.getItem('token'));

    let body = {
      "username": customer.username,
      "last_name": customer.last_name,
      "phone": customer.phone,
      "password": customer.password

    }
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    }
    return this.http.post(this.url + '/users/register', body, httpOptions)
  }

  logout() {
    localStorage.setItem('isLoggedin', 'false');
    localStorage.setItem('isAdmin', 'false');
    this.router.navigate(['login']).then(() => window.location.reload());
  }

  isLoggedin(): boolean {
    return localStorage.getItem('isLoggedin') == 'true';
  }

  isAdmin(): boolean {
    return localStorage.getItem('isAdmin') == 'true';
  }
}
