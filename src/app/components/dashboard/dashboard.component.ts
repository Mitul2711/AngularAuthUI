import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService, private apiService: ApiService) {}

  public users: any = [];

  ngOnInit() {

    this.apiService.getUser().subscribe(res => {
      this.users = res;
      console.log(res)
    })
  }

  logOut() {
    this.authService.signOut();
  }

}
