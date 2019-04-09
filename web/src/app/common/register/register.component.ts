import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/shared/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { ComponentActions } from 'src/app/shared/classes/utils/component-actions';
declare var $: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Input() id = '';
  registerForm: FormGroup;
  registerFail: boolean = false;
  messageError: string = "";
  constructor(private formBuilder: FormBuilder, private loginService: LoginService,
    private toastrService: ToastrService, private action: ComponentActions) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'phone': new FormControl('', Validators.required),
      'confirmPassword': new FormControl(''),
      'fullname': new FormControl('')
    });
  }

  Register() {
    let { email, password, phone, fullname } = this.registerForm.value;
    this.action.showLoading();
    this.loginService.Register(email, password, phone, fullname).subscribe(result => {
      this.action.hideLoading();
      this.toastrService.success('Tạo tài khoản thành công', '', { timeOut: 3500 });
      this.navToHomeLoginForm();
    }, (err) => {
      this.action.hideLoading();
      this.registerFail = true;
      this.messageError = err.message;
    })
  }

  navToHomeLoginForm() {
    $("#modalRegisterForm").modal("hide");
    $("#modalLoginForm").modal("show");
  }
}
