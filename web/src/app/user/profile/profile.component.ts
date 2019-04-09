import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ComponentActions } from 'src/app/shared/classes/utils/component-actions';
import { User } from 'src/app/shared/classes/user/user';
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
  editFaild: boolean = false;
  changePassFaild: boolean = false;
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
      'confirmNewPassword': new FormControl('', Validators.required)
    },
      {
        validator: this.passwordMatchValidator
      })
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('newPassword').value == g.get('confirmNewPassword').value
      ? null : { passwordMatchValidator: { valid: false } };
  }

  getProfile() {
    this.action.showLoading();
    this.userService.getProfile().subscribe((result) => {
      this.action.hideLoading();
      this.user.setUser(result);
      this.initForm();
      this.bindData(result);
    }, (err) => {
      this.action.hideLoading();
      console.log(err)
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
    this.action.showLoading();
    this.userService.updateProfile(data).subscribe((result) => {
      this.toastrService.success('Cập nhật thông tin thành công!', '', { timeOut: 3500 });
      this.editFaild = false;
      this.action.hideLoading();
    }, (err) => {
      this.action.hideLoading();
      this.editFaild = true;
      this.messageError = err.message;
    })
  }

  changePass() {
    const data = {
      currentPassword: this.getValueByNameFormChangePass('currentPassword'),
      newPassword: this.getValueByNameFormChangePass('newPassword')
    }
    this.action.showLoading();
    this.userService.changePass(data).subscribe((result) => {
      this.toastrService.success('Thay đổi mật khẩu thành công!', '', { timeOut: 3500 });
      this.changePassFaild = false;
      this.changePassForm.reset();
      this.action.hideLoading();
    }, (err) => {
      this.action.hideLoading();
      this.changePassFaild = true;
      this.messageError = err.message;
    })

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
