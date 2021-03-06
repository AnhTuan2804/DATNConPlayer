import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ComponentActions } from 'src/app/shared/classes/utils/component-actions';
import { User } from 'src/app/shared/classes/user/user';
import * as _ from 'lodash';
import { LevelService } from 'src/app/shared/services/level.service';
import { Level } from 'src/app/shared/classes/level';
import { Utils } from 'src/app/shared/enums/utils';
import { Title } from '@angular/platform-browser';
declare var $: any;
@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss']
})
export class LevelComponent implements OnInit {

  formAdd: FormGroup;
  formEdit: FormGroup;
  editFaild: boolean = false;
  addFaild: boolean = false;
  messageError: string = "";
  headers = ['No.', 'Name of level', 'Actions'];
  items = [];
  showEditForm = false;
  objectLevelEvent;
  constructor(private formBuilder: FormBuilder, private levelService: LevelService,
    private toastrService: ToastrService, private action: ComponentActions,
    private titleService: Title,
    public user: User, private level: Level) {
    this.initForm()
    this.getList();
  }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.navToHomeLoginForm();
    }
    this.titleService.setTitle('Manage Level page');
  }

  initForm() {
    this.formAdd = this.formBuilder.group({
      'level': new FormControl('', Validators.required)
    });
    this.formEdit = this.formBuilder.group({
      'level': new FormControl('', Validators.required)
    });
  }

  getList() {
    this.action.showLoading();
    this.levelService.getList().subscribe((result) => {
      this.action.hideLoading();
      this.items = this.level.setData(result);
    }, (err) => {
      this.action.hideLoading();
      console.log(err)
    })
  }

  outputContentStatus(event) {
    this.objectLevelEvent = _.find(this.items, (item) => {
      return item.level.id == event.item.level.id;
    })
    this.formEdit.patchValue({
      level: event.item.level.name
    })
    this.showEditForm = true;
  }

  add() {
    const data = {
      name: this.getValueFormAdd('level')
    }
    this.action.showLoading();
    this.levelService.createLevel({ level: data }).subscribe((result) => {
      this.toastrService.success(Utils.MESSAGE_CREATE_SUCCESS, '', { timeOut: 3500 });
      this.addFaild = false;
      this.formAdd.reset();
      this.getList();
    }, (err) => {
      this.action.hideLoading();
      this.addFaild = true;
      this.messageError = err.message;
      this.toastrService.error(err.message, '', { timeOut: 3500 });
    })
  }

  edit() {
    const data = {
      name: this.getValueFormEdit('level'),
      id: this.objectLevelEvent.level.id
    }
    this.action.showLoading();
    this.levelService.updateLevel(data).subscribe((result) => {
      this.toastrService.success(Utils.MESSAGE_UPDATE_SUCCESS, '', { timeOut: 3500 });
      this.editFaild = false;
      this.formEdit.reset();
      this.showEditForm = false;
      this.getList();
    }, (err) => {
      this.action.hideLoading();
      this.editFaild = true;
      this.messageError = err.message;
      this.toastrService.error(err.message, '', { timeOut: 3500 });
    })
  }

  handleAction(event) {
    this.action.showLoading();
    this.levelService.deleteLevel({ id: event.item.level.id }).subscribe((result) => {
      this.toastrService.success(Utils.MESSAGE_DELETE_SUCCESS, '', { timeOut: 3500 });
      this.formEdit.reset();
      this.objectLevelEvent = null;
      this.showEditForm = false;
      this.getList();
    }, (err) => {
      this.action.hideLoading();
      this.toastrService.error(err.message, '', { timeOut: 3500 });
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
