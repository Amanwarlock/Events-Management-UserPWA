import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm =  this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });


  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
  }

  OnLogin(){
    let loginData = this.loginForm.value;
    loginData.role = 'Admin';
    this.authService.login(loginData).subscribe(() => {
      let redirectUrl = this.authService.getRedirectUrl();
        if(redirectUrl){
          let redirect = this.router.parseUrl(redirectUrl);
          this.router.navigateByUrl(redirect);
        }else{
          this.router.navigate(['/events']);
        }
    });
  }

}
