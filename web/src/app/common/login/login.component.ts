import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { LoginService } from 'src/app/shared/services/login.service';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() id = '';
  @Input() isShow = false;
  loginForm: FormGroup;
  loginFail: boolean = false;
  messageError: string = "";
  showLoading = false;
  constructor(private formBuilder: FormBuilder, private loginService: LoginService ) { }

  ngOnInit() {
    // if (!_.isEmpty(localStorage.getItem('tct-token'))) {
    //   this.navToHome();
    // }
    this.loginForm = this.formBuilder.group({
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }


  doLogin() {
    let { email, password } = this.loginForm.value;
    console.log(email, password)
    // this.showLoading = true;
    this.loginService.doLogin(email, password).subscribe(result => {
      // this.showLoading = false;
      if (result) {
        if (result.is_lock) {
          this.loginFail = true;
          this.messageError = "Account Block";
        } else {
          this.loginFail = false;
          // this.user.setUser(result)
          this.navToHome()
        }
      }
    }, (err) => {
      // this.showLoading = false;
      this.loginFail = true;
      this.messageError = err.message;
      console.log('Login Faild');
    })
  }

  navToHome() {
    // var navvigateManagement = 'management';
    // console.log('navigating...'); this.router.navigate(['dashboard']);
  }

}
