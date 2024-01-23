import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = 'https://localhost:7129/api/User'

  constructor(private httpClient: HttpClient) { }

  signUp(userObj: any) {
    return this.httpClient.post<any>(this.baseUrl + "register", userObj);
  }

  login(loginObj: any) {
    return this.httpClient.post<any>(this.baseUrl + "authenticate", loginObj)
  }

}
