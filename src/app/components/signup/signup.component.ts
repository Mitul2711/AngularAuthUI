import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateforms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa fa-eye-slash';
  signupForm!: FormGroup;

  constructor(
    private fb : FormBuilder, 
    private authService: AuthService,
    private router: Router,
    private toast: NgToastService
    ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      userName: ['', Validators.required],
      passWord: ['', Validators.required],
    })
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = 'fa-eye': this.eyeIcon = 'fa-eye-slash';
    this.isText ? this.type = 'text': this.type = 'password';
  }

  onSignUp() {
    
    if(this.signupForm.valid) {
      console.log(this.signupForm.value);
      this.authService.signUp(this.signupForm.value).subscribe(x=>{
        this.toast.success({detail: "SUCCESS", summary: x.message, duration: 5000});
        this.router.navigate(['login']);
      },
      err =>{
        this.toast.error({detail: "ERROR", summary: err.error.message, duration: 5000});
      }
      )
    }else {
      ValidateForm.validateAllFormsFields(this.signupForm);
    }
  }
  

  



}
