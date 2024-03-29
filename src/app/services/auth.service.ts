import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = 'https://localhost:7129/api/User/';
  private userPayload: any;

  constructor(private httpClient: HttpClient, private router: Router) { 
    this.userPayload = this.decodedToken();
  }

  signUp(userObj: any) {
    return this.httpClient.post<any>(this.baseUrl + "register", userObj);
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  login(loginObj: any) {
    return this.httpClient.post<any>(this.baseUrl + "authenticate", loginObj)
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token);
  }

  getFullNameformToken() {
    if(this.userPayload) {
      return this.userPayload.unique_name;
    }
  }

  getRoleFromToken() {
    if(this.userPayload) {
      return this.userPayload.role;
    }
  }

}
