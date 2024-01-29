import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService, private apiService: ApiService, private userStore: UserStoreService) {}

  public users: any = [];
  public fullName: string = "";

  ngOnInit() {

    this.apiService.getUser().subscribe(res => {
      this.users = res;
    })

    this.userStore.getFullNameFromStore().subscribe(val => {
      let fullNameFromToken = this.authService.getFullNameformToken();
      this.fullName = val || fullNameFromToken;
    })
  }

  logOut() {
    this.authService.signOut();
  }

}
