import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/shared/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { ComponentActions } from 'src/app/shared/classes/utils/component-actions';
import { Utils } from 'src/app/shared/enums/utils';
import { Title } from '@angular/platform-browser';
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
  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService,
    private toastrService: ToastrService,
    private titleService: Title,
    private action: ComponentActions) { }

  ngOnInit() {

  }

  ngOnChanges(changes): void {
    this.titleService.setTitle('Register');
    this.initForm()
  }

  initForm() {
    this.registerForm = this.formBuilder.group({
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'phone': new FormControl('', Validators.required),
      'confirmPassword': new FormControl('', Validators.required),
      'fullname': new FormControl('')
    },
      {
        validator: this.passwordMatchValidator
      });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value == g.get('confirmPassword').value
      ? null : { passwordMatchValidator: { valid: false } };
  }

  Register() {
    let { email, password, phone, fullname } = this.registerForm.value;
    this.action.showLoading();
    this.loginService.Register(email, password, phone, fullname).subscribe(result => {
      this.action.hideLoading();
      this.toastrService.success(Utils.MESSAGE_CREATE_SUCCESS, '', { timeOut: 3500 });
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
