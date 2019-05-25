import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/shared/services/login.service';
import { ComponentActions } from 'src/app/shared/classes/utils/component-actions';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
declare var $: any;
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  @Input() id = '';
  resetPassForm: FormGroup;
  message: string = "";
  constructor(private formBuilder: FormBuilder,
    private action: ComponentActions,
    private loginService: LoginService,
    private titleService: Title,
    private toastrService: ToastrService) { }

  ngOnInit() {
    this.titleService.setTitle('Reset Password');
    this.resetPassForm = this.formBuilder.group({
      'email': new FormControl('', Validators.required)
    });
  }

  resetPass() {
    let email = this.resetPassForm.controls['email'].value;
    this.action.showLoading();
    this.loginService.ResetPass(email).subscribe(result => {
      this.resetPassForm.reset();
      this.action.hideLoading();
      this.message = '';
      this.navToLoginForm();
      this.toastrService.success(result.message, '', { timeOut: 4500 });
    }, (err) => {
      this.action.hideLoading();
      this.message = err.message;
    })
  }

  navToLoginForm() {
    $('#modalResetPassForm').modal('hide');
    $("#modalLoginForm").modal("show");
  }
}
