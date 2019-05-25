import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ComponentActions } from 'src/app/shared/classes/utils/component-actions';
import { User } from 'src/app/shared/classes/user/user';
import * as _ from 'lodash';
import { UserService } from 'src/app/shared/services/user.service';
import { InfoCommonService } from 'src/app/shared/services/info-common.service';
import { Utils } from 'src/app/shared/enums/utils';
declare var $: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  changePassForm: FormGroup;
  formAdd: FormGroup;
  editFaild: boolean = false;
  changePassFaild: boolean = false;
  messageError: string = "";
  isAdmin = false;
  listUser = [];
  listRole = [];
  headers = ['No.', 'Email', 'Fullname', 'Phone', 'Actions'];
  objectDeleteEvent;
  isShow = true;
  constructor(private formBuilder: FormBuilder, private infoCommonService: InfoCommonService,
    private userService: UserService, private toastrService: ToastrService,
    private action: ComponentActions, public user: User) {
    this.getProfile();
    this.getListRole();
    this.initForm();
  }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.navToHomeLoginForm();
    }
    if (localStorage.getItem('role') && localStorage.getItem('role') == 'Admin') {
      this.getUserForAdmin();
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
      });
    this.formAdd = this.formBuilder.group({
      'email': new FormControl('', Validators.required),
      'phone': new FormControl('', Validators.required),
      'fullname': new FormControl(''),
      'password': new FormControl('', Validators.required),
      'confirmPassword': new FormControl('', Validators.required),
      'role': new FormControl('', Validators.required),
      'role_id': new FormControl('')
    },
      {
        validator: this.passwordMatchValidatorCreate
      });
  }

  passwordMatchValidatorCreate(g: FormGroup) {
    return g.get('password').value == g.get('confirmPassword').value
      ? null : { passwordMatchValidatorCreate: { valid: false } };
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

  getListRole() {
    this.infoCommonService.getListRole().subscribe((result) => {
      this.listRole = this.getForDropDown(result);
    })
  }

  getForDropDown(result) {
    let tmp = [];
    _.forEach(result, (item) => {
      let data = [];
      data['role'] = item;
      data['itemName'] = item.role
      tmp.push(data);
    })
    return tmp
  }

  getUserForAdmin() {
    this.userService.getListUserForAdmin().subscribe((listUser) => {
      this.listUser = this.user.setData(listUser);
      this.isAdmin = true;
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
      this.toastrService.success(Utils.MESSAGE_UPDATE_SUCCESS, '', { timeOut: 3500 });
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
      this.toastrService.success(Utils.MESSAGE_UPDATE_SUCCESS, '', { timeOut: 3500 });
      this.changePassFaild = false;
      this.changePassForm.reset();
      this.action.hideLoading();
    }, (err) => {
      this.action.hideLoading();
      this.changePassFaild = true;
      this.messageError = err.message;
    })
  }

  handleDownSelect(event, tab) {
    if (tab == 'role') {
      this.formAdd.patchValue({
        role_id: event.value.role.id,
        role: event.value.role.role
      })
    }
  }

  addAccount() {
    const data = {
      email: this.getValueByNameFormAddAccount('email'),
      fullname: this.getValueByNameFormAddAccount('fullname'),
      phone: this.getValueByNameFormAddAccount('phone'),
      role_id: this.getValueByNameFormAddAccount('role_id'),
      password: this.getValueByNameFormAddAccount('password'),
    }
    this.action.showLoading();
    this.userService.createNewAccount({ user: data }).subscribe((result) => {
      this.toastrService.success(Utils.MESSAGE_CREATE_SUCCESS, '', { timeOut: 3000 });
      this.formAdd.reset();
      this.action.hideLoading();
      this.getUserForAdmin();
    }, (err) => {
      this.action.hideLoading();
      this.toastrService.error(err.message, '', { timeOut: 3000 });
    })
  }

  getValueByNameFormAddAccount(name) {
    return this.formAdd.controls[name].value;
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

  handleAction(event) {
    $('#delete-account').modal('show');
    this.objectDeleteEvent = event;
  }
  saveConfirm() {
    $('#delete-account').modal('hide');
    this.deleteAccount();
  }

  cancelConfirm() {
    $('#delete-account').modal('hide');
    this.objectDeleteEvent = null;
  }

  deleteAccount() {
    this.action.showLoading();
    this.userService.deleteAccount({ id: this.objectDeleteEvent.item.user.id }).subscribe(() => {
      this.toastrService.success(Utils.MESSAGE_DELETE_SUCCESS, '', { timeOut: 3000 });
      this.getUserForAdmin();
      this.action.hideLoading();
    }, err => {
      this.action.hideLoading();
      this.toastrService.error(err.message, '', { timeOut: 3000 });
    })
  }

  actionForm(tab) {
    this.isShow = tab == 'show' ? false : true;
  }
}
