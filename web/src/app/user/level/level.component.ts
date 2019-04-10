import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ComponentActions } from 'src/app/shared/classes/utils/component-actions';
import { User } from 'src/app/shared/classes/user/user';
import * as _ from 'lodash';
import { LevelService } from 'src/app/shared/services/level.service';
import { Level } from 'src/app/shared/classes/level';
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
  headers = ['Stt', 'Trình độ', 'Hành động'];
  items = [];
  showEditForm = false;
  objectLevelEvent;
  constructor(private formBuilder: FormBuilder, private levelService: LevelService,
    private toastrService: ToastrService, private action: ComponentActions,
    public user: User, private level: Level) {
    this.initForm()
    this.getList();
  }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.navToHomeLoginForm();
    }
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
      level: event.item.level.level
    })
    this.showEditForm = true;
  }

  add() {
    const data = {
      level: this.getValueFormAdd('level')
    }
    this.action.showLoading();
    this.levelService.createLevel({ level: data }).subscribe((result) => {
      this.toastrService.success('Thêm thành công!', '', { timeOut: 3500 });
      this.addFaild = false;
      this.formAdd.reset();
      this.getList();
    }, (err) => {
      this.action.hideLoading();
      this.addFaild = true;
      this.messageError = err.message;
    })
  }

  edit() {
    const data = {
      level: this.getValueFormEdit('level'),
      id: this.objectLevelEvent.level.id
    }
    this.action.showLoading();
    this.levelService.updateLevel(data).subscribe((result) => {
      this.toastrService.success('Cập nhật thành công!', '', { timeOut: 3500 });
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
    this.levelService.deleteLevel({ id: event.item.level.id }).subscribe((result) => {
      this.toastrService.success('Xóa thành công!', '', { timeOut: 3500 });
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
