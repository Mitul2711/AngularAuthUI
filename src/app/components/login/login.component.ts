import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateforms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa fa-eye-slash';
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: NgToastService
  ) { }
  
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      passWord: ['', Validators.required]
    })
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = 'fa-eye' : this.eyeIcon = 'fa-eye-slash';
    this.isText ? this.type = 'text' : this.type = 'password';
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value).subscribe({
        next: res => {
          this.toast.success({ detail: "SUCCESS", summary: res.message, duration: 5000 });
          this.authService.storeToken(res.token);
          this.router.navigate(['dashboard'])
        },
        error: err => {
          this.toast.error({ detail: "ERROR", summary: "Something went wrong!", duration: 5000 });
        }
      })
    } else {
      console.log('form is invalid');
      ValidateForm.validateAllFormsFields(this.loginForm);
    }
  }

}
