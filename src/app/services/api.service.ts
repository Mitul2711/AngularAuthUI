import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  private baseUrl = 'https://localhost:7129/api/User/';

  getUser() {
    return this.httpClient.get<any>(this.baseUrl);
  }

}
