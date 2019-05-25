import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ComponentActions } from 'src/app/shared/classes/utils/component-actions';
import { User } from 'src/app/shared/classes/user/user';
import * as _ from 'lodash';
import { CareerService } from 'src/app/shared/services/career.service';
import { Career } from 'src/app/shared/classes/career';
import { Utils } from 'src/app/shared/enums/utils';
import { Title } from '@angular/platform-browser';
declare var $: any;
@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss']
})
export class CareerComponent implements OnInit {

  formAdd: FormGroup;
  formEdit: FormGroup;
  editFaild: boolean = false;
  addFaild: boolean = false;
  messageError: string = "";
  headers = ['No.', 'Career', 'Actions'];
  items = [];
  showEditForm = false;
  objectLevelEvent;
  constructor(private formBuilder: FormBuilder, private careerService: CareerService,
    private toastrService: ToastrService, private action: ComponentActions,
    private titleService: Title,
    public user: User, private career: Career) {
    this.initForm()
    this.getList();
  }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.navToHomeLoginForm();
    }
    this.titleService.setTitle('Manage Career page');
  }

  initForm() {
    this.formAdd = this.formBuilder.group({
      'career': new FormControl('', Validators.required)
    });
    this.formEdit = this.formBuilder.group({
      'career': new FormControl('', Validators.required)
    });
  }

  getList() {
    this.action.showLoading();
    this.careerService.getList().subscribe((result) => {
      this.action.hideLoading();
      this.items = this.career.setData(result);
    }, (err) => {
      this.action.hideLoading();
      console.log(err)
    })
  }

  outputContentStatus(event) {
    this.objectLevelEvent = _.find(this.items, (item) => {
      return item.career.id == event.item.career.id;
    })
    this.formEdit.patchValue({
      career: event.item.career.name
    })
    this.showEditForm = true;
  }

  add() {
    const data = {
      name: this.getValueFormAdd('career')
    }
    this.action.showLoading();
    this.careerService.createCareer({ career: data }).subscribe((result) => {
      this.toastrService.success(Utils.MESSAGE_CREATE_SUCCESS, '', { timeOut: 3500 });
      this.addFaild = false;
      this.formAdd.reset();
      this.getList();
    }, (err) => {
      this.action.hideLoading();
      this.addFaild = true;
      this.messageError = err.message;
      this.toastrService.error(this.messageError, '', { timeOut: 3500 });
    })
  }

  edit() {
    const data = {
      name: this.getValueFormEdit('career'),
      id: this.objectLevelEvent.career.id
    }
    this.action.showLoading();
    this.careerService.updateCareer(data).subscribe((result) => {
      this.toastrService.success(Utils.MESSAGE_UPDATE_SUCCESS, '', { timeOut: 3500 });
      this.editFaild = false;
      this.formEdit.reset();
      this.showEditForm = false;
      this.getList();
    }, (err) => {
      this.action.hideLoading();
      this.editFaild = true;
      this.messageError = err.message;
    })
  }

  handleAction(event) {
    this.action.showLoading();
    this.careerService.deleteCareer({ id: event.item.career.id }).subscribe((result) => {
      this.toastrService.success(Utils.MESSAGE_DELETE_SUCCESS, '', { timeOut: 3500 });
      this.formEdit.reset();
      this.objectLevelEvent = null;
      this.showEditForm = false;
      this.getList();
    }, (err) => {
      this.action.hideLoading();
      this.toastrService.success(err.message, '', { timeOut: 3500 });
    })

  }

  getValueFormAdd(name) {
    return this.formAdd.controls[name].value;
  }

  getValueFormEdit(name) {
    return this.formEdit.controls[name].value;
  }

  navToHomeLoginForm() {
    $("#modalLoginForm").modal("show");
  }
}
