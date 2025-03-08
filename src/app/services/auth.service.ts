import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user;

  async login(loginData) {
    let headers = new HttpHeaders({
      apiKey: environment.apiKey,
    });
    const loginResponse: any = await this.http
      .post(environment.apiUrl + '/api/BizzBean/v1/login', loginData, {
        headers,
      })
      .toPromise();
    sessionStorage.setItem('username', loginResponse.userName);
    if (loginResponse.token != '' && loginResponse.status == 'SUCCESS') {
      sessionStorage.setItem('sessionToken', loginResponse.token);
      this.user = loginResponse;
      this.router.navigateByUrl('/main/dashboard');
      return;
    } else {
      throw 'Something went wrong';
    }
  }

  async register(registerData) {
    let headers = new HttpHeaders({
      apiKey: environment.apiKey,
    });

    const registerResponse: any = await this.http
      .post(environment.asoneUrl + '/BBregistration', registerData, {
        headers,
      })
      .toPromise();

    if (registerResponse.status == 'SUCCESS') {
      this.router.navigateByUrl('/auth/login');
    } else {
      throw 'Something went wrong';
    }
  }

  async forgotPasswrod(forgotData) {
    let headers = new HttpHeaders({
      apiKey: environment.apiKey,
    });

    return this.http
      .post(environment.apiUrl + '/api/BizzBean/v1/forgot', forgotData, {
        headers,
      })
      .toPromise();
  }

  isAuthenticated() {
    if (
      sessionStorage.getItem('sessionToken') != '' &&
      sessionStorage.getItem('sessionToken') != undefined
    ) {
      return true;
    } else {
      return false;
    }
  }

  getSessionToken() {
    return sessionStorage.getItem('sessionToken');
  }

  logout() {
    this.user = undefined;
  }

  constructor(private http: HttpClient, private router: Router) {}
}
