import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/shared/services/login.service';
import { ComponentActions } from 'src/app/shared/classes/utils/component-actions';
declare var $: any;
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  @Input() id = '';
  @Output() outputregister = new EventEmitter();
  @Output() ouputForgotPass = new EventEmitter();
  resetPassForm: FormGroup;
  message: string = "";
  success = false;
  constructor(private formBuilder: FormBuilder, private action: ComponentActions,
    private loginService: LoginService) { }

  ngOnInit() {
    this.resetPassForm = this.formBuilder.group({
      'email': new FormControl('', Validators.required)
    });
  }

  resetPass() {
    let email = this.resetPassForm.controls['email'].value;
    this.action.showLoading();
    this.loginService.ResetPass(email).subscribe(result => {
      this.action.hideLoading();
      this.message = result.message;
      this.success = true;
    }, (err) => {
      this.action.hideLoading();
      this.message = err.message;
    })
  }

  showRegister() {
    this.outputregister.emit();
  }

  showForgotPass() {
    this.ouputForgotPass.emit();
  }
}
