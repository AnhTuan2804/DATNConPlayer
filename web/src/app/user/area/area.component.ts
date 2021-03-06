import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ComponentActions } from 'src/app/shared/classes/utils/component-actions';
import { User } from 'src/app/shared/classes/user/user';
import * as _ from 'lodash';
import { AreaService } from 'src/app/shared/services/area.service';
import { Area } from 'src/app/shared/classes/area';
import { Utils } from 'src/app/shared/enums/utils';
import { Title } from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {
  formAdd: FormGroup;
  formEdit: FormGroup;
  changePassForm: FormGroup;
  editFaild: boolean = false;
  addFaild: boolean = false;
  messageError: string = "";
  headers = ['No.', 'Area', 'Actions'];
  items = [];
  showEditForm = false;
  objectAreaEvent;
  constructor(private formBuilder: FormBuilder, private areaService: AreaService,
    private toastrService: ToastrService, private action: ComponentActions,
    private titleService: Title,
    public user: User, private area: Area) {
    this.initForm()
    this.getListArea();
  }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.navToHomeLoginForm();
    }
    this.titleService.setTitle('Manage Area');
  }

  initForm() {
    this.formAdd = this.formBuilder.group({
      'area': new FormControl('', Validators.required)
    });
    this.formEdit = this.formBuilder.group({
      'area': new FormControl('', Validators.required)
    });
  }

  getListArea() {
    this.action.showLoading();
    this.areaService.getList().subscribe((result) => {
      this.action.hideLoading();
      this.items = this.area.setArea(result);
    }, (err) => {
      this.action.hideLoading();
      console.log(err)
    })
  }

  outputContentStatus(event) {
    this.objectAreaEvent = _.find(this.items, (item) => {
      return item.area.name == event.item.area.name;
    })
    this.formEdit.patchValue({
      area: event.item.area.name
    })
    this.showEditForm = true;
  }

  addArea() {
    const data = {
      name: this.getValueFormAdd('area')
    }
    this.action.showLoading();
    this.areaService.createArea({ area: data }).subscribe((result) => {
      this.toastrService.success(Utils.MESSAGE_CREATE_SUCCESS, '', { timeOut: 3500 });
      this.addFaild = false;
      this.formAdd.reset();
      this.getListArea();
    }, (err) => {
      this.action.hideLoading();
      this.addFaild = true;
      this.messageError = err.message;
    })
  }

  editArea() {
    const data = {
      name: this.getValueFormEdit('area'),
      id: this.objectAreaEvent.area.id
    }
    this.action.showLoading();
    this.areaService.updateArea(data).subscribe((result) => {
      this.toastrService.success(Utils.MESSAGE_UPDATE_SUCCESS, '', { timeOut: 3500 });
      this.editFaild = false;
      this.formEdit.reset();
      this.showEditForm = false;
      this.getListArea();
    }, (err) => {
      this.action.hideLoading();
      this.editFaild = true;
      this.messageError = err.message;
    })
  }

  handleAction(event) {
    this.action.showLoading();
    this.areaService.deleteArea({ id: event.item.area.id }).subscribe((result) => {
      this.toastrService.success(Utils.MESSAGE_DELETE_SUCCESS, '', { timeOut: 3500 });
      this.formEdit.reset();
      this.objectAreaEvent = null;
      this.showEditForm = false;
      this.getListArea();
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
