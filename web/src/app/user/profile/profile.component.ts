import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ComponentActions } from 'src/app/shared/classes/utils/component-actions';
import { LoginService } from 'src/app/shared/services/login.service';
import { User } from 'src/app/shared/classes/user/user';
import { isEmpty } from 'rxjs/operators';
import * as _ from 'lodash';
import { UserService } from 'src/app/shared/services/user.service';
declare var $: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  changePassForm: FormGroup;
  editFail: boolean = false;
  messageError: string = "";
  showLoading = false;
  constructor(private formBuilder: FormBuilder,
    private userService: UserService, private toastrService: ToastrService,
    private action: ComponentActions, public user: User) {
    this.getProfile()
    this.initForm()
  }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.navToHomeLoginForm();
    }
  }

  initForm() {
    this.profileForm = this.formBuilder.group({
      'email': new FormControl('', Validators.required),
      'phone': new FormControl('', Validators.required),
      'fullname': new FormControl('')
    });
    this.changePassForm = this.formBuilder.group({
      'currentPassword': new FormControl('', Validators.required),
      'newPassword': new FormControl('', Validators.required),
      'confirmNewPassword': new FormControl('')
    })
  }

  getProfile() {
    this.userService.getProfile(localStorage.getItem('token')).subscribe((result) => {
      this.user.setUser(result);
      this.initForm();
      this.bindData(result);
    })
  }

  bindData(user) {
    this.profileForm.patchValue({
      email: user.email ? user.email : '',
      fullname: user.fullname ? user.fullname : '',
      phone: user.phone ? user.phone : ''
    });
  }

  changeInfor() {
    const data = {
      phone: this.getValueByNameFormInfor('phone'),
      fullname: this.getValueByNameFormInfor('fullname')
    }
    console.log('infor ', data)
  }

  changePass() {
    const data = {
      password: this.getValueByNameFormChangePass('newPassword')
    }
    console.log('changepass', data)
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('newPassword').value == g.get('confirmNewPassword').value
      ? null : { passwordMatchValidator: { valid: false } };
  }


  getValueByNameFormInfor(name) {
    return this.profileForm.controls[name].value;
  }

  getValueByNameFormChangePass(name) {
    return this.changePassForm.controls[name].value;
  }

  navToHomeLoginForm() {
    $("#modalLoginForm").modal("show");
  }
}
