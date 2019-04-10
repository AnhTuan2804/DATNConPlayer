import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import * as _ from 'lodash';
import { LoginService } from 'src/app/shared/services/login.service';
import { User } from 'src/app/shared/classes/user/user';
import { ComponentActions } from 'src/app/shared/classes/utils/component-actions';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() id = '';
  @Output() outputregister = new EventEmitter();
  @Output() ouputForgotPass = new EventEmitter();
  loginForm: FormGroup;
  loginFail: boolean = false;
  messageError: string = "";
  constructor(private formBuilder: FormBuilder, private loginService: LoginService,
    private user: User, private componentAction: ComponentActions, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

  doLogin() {
    let { email, password } = this.loginForm.value;
    this.componentAction.showLoading();
    this.loginService.doLogin(email, password).subscribe(result => {
      this.componentAction.hideLoading();
      if (result) {
        this.loginFail = false;
        $("#modalLoginForm").modal("hide");
        this.user.setUser(result);
        this.router.navigate(['abc/team']);
      }
      // window.location.reload();
    }, (err) => {
      this.componentAction.hideLoading();
      this.loginFail = true;
      this.messageError = err.message;
      console.log('Login Faild');
    })
  }

  showRegister() {
    this.outputregister.emit();
  }

  showForgotPass() {
    this.ouputForgotPass.emit();
  }

}
