import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ComponentActions } from 'src/app/shared/classes/utils/component-actions';
import { User } from 'src/app/shared/classes/user/user';
import * as _ from 'lodash';
import { AreaService } from 'src/app/shared/services/area.service';
import { Area } from 'src/app/shared/classes/area';
import { LevelService } from 'src/app/shared/services/level.service';
import { Level } from 'src/app/shared/classes/level';
import { TeamService } from 'src/app/shared/services/team.service';
declare var $: any;

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  formAdd: FormGroup;
  formEdit: FormGroup;
  changePassForm: FormGroup;
  editFaild: boolean = false;
  addFaild: boolean = false;
  messageError: string = "";
  headers = ['Stt', 'Khu vực', 'Hành động'];
  listArea = [];
  listLevel = [];
  showEditForm = false;
  objectAreaEvent;
  objectLevelEvent;
  selectedIndex;
  constructor(private formBuilder: FormBuilder, private areaService: AreaService,
    private levelService: LevelService, private level: Level, private teamService: TeamService,
    private toastrService: ToastrService, private action: ComponentActions,
    public user: User, private area: Area) {
    this.initForm()
    this.getListArea();
    this.getListLevel();
  }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.navToHomeLoginForm();
    }
    console.log(this.user);

  }

  initForm() {
    this.formAdd = this.formBuilder.group({
      'name': new FormControl('', Validators.required),
      'age_min': new FormControl('', Validators.required),
      'age_max': new FormControl('', Validators.required),
      'description': new FormControl(''),
      'level': new FormControl('', Validators.required),
      'area': new FormControl('', Validators.required),
      'picture': new FormControl('')
    });
  }

  getListArea() {
    this.areaService.getList().subscribe((result) => {
      this.listArea = this.area.getListAreaForDropdown(result);
    }, (err) => {
      console.log(err)
    })
  }

  getListLevel() {
    this.levelService.getList().subscribe((result) => {
      this.listLevel = this.level.getListForDropdown(result);
    }, (err) => {
      console.log(err)
    })
  }

  // outputContentStatus(event) {
  //   this.objectAreaEvent = _.find(this.items, (item) => {
  //     return item.area.area == event.item.area.area;
  //   })
  //   this.formEdit.patchValue({
  //     area: event.item.area.area
  //   })
  //   this.showEditForm = true;
  // }

  add() {
    const data = {
      name: this.getValueFormAdd('name'),
      age_max: this.getValueFormAdd('age_max'),
      age_min: this.getValueFormAdd('age_min'),
      level: this.getValueFormAdd('level'),
      area: this.getValueFormAdd('area'),
      description: this.getValueFormAdd('description'),
      user_id: this.user.id
    }
    console.log(data);
    console.log(this.user)

    // this.action.showLoading();
    // this.teamService.createTeam({ team: data }).subscribe((result) => {
    //   this.toastrService.success('Thêm thành công!', '', { timeOut: 3500 });
    //   this.addFaild = false;
    //   this.formAdd.reset();
    //   this.action.hideLoading();
    //   // this.getListArea();
    // }, (err) => {
    //   this.action.hideLoading();
    //   this.addFaild = true;
    //   this.messageError = err.message;
    // })
  }

  editArea() {
    const data = {
      area: this.getValueFormEdit('area'),
      id: this.objectAreaEvent.area.id
    }
    this.action.showLoading();
    this.areaService.updateArea(data).subscribe((result) => {
      this.toastrService.success('Cập nhật thành công!', '', { timeOut: 3500 });
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
      this.toastrService.success('Xóa thành công!', '', { timeOut: 3500 });
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

  handleDownSelect(event, tab) {
    if (tab == 'area') {
      this.objectAreaEvent = event.value;
      this.formAdd.patchValue({
        area: event.value.area.area
      });
    } else {
      this.objectLevelEvent = event.value;
      this.formAdd.patchValue({
        level: event.value.level.level
      });
    }
  }

}
