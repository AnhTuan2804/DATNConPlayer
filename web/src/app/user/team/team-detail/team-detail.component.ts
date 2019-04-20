import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ComponentActions } from 'src/app/shared/classes/utils/component-actions';
import * as _ from 'lodash';
import { AreaService } from 'src/app/shared/services/area.service';
import { Area } from 'src/app/shared/classes/area';
import { LevelService } from 'src/app/shared/services/level.service';
import { Level } from 'src/app/shared/classes/level';
import { TeamService } from 'src/app/shared/services/team.service';
import { Team } from 'src/app/shared/classes/team';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {

  formDetail: FormGroup;
  formAddMember: FormGroup;
  editFaild: boolean = false;
  messageError: string = "";
  messageErrAddMember: string = "";
  addMemberFaild: boolean = false;
  headers = ['No.', 'Tên thành viên', 'Số điện thoại', 'Actions'];
  listArea = [];
  listLevel = [];
  listUser = [];
  showEditForm = false;
  objectAreaEvent;
  objectLevelEvent;
  selectedIndex;
  view: boolean = false;
  dataDetail;
  constructor(private formBuilder: FormBuilder, private areaService: AreaService,
    private levelService: LevelService, private level: Level,
    private teamService: TeamService, private team: Team,
    private toastrService: ToastrService, private action: ComponentActions,
    private area: Area, private router: Router, private route: ActivatedRoute) {
    this.initForm()
    this.getListArea();
    this.getListLevel();
  }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.navToHomeLoginForm();
    }
    this.route.params.subscribe((params) => {
      const id = params.id;
      const item = params.item;
      if (item == 'view') {
        this.view = true;
      }
      this.getTeamDetail(id);
    })
  }

  initForm() {
    this.formDetail = this.formBuilder.group({
      'name': new FormControl('', Validators.required),
      'age_min': new FormControl('', Validators.required),
      'age_max': new FormControl('', Validators.required),
      'description': new FormControl(''),
      'level': new FormControl('', Validators.required),
      'level_id': new FormControl(''),
      'area_id': new FormControl(''),
      'area': new FormControl('', Validators.required),
      'picture': new FormControl('')
    });
    this.formAddMember = this.formBuilder.group({
      'member': new FormControl('', Validators.required)
    })
  }

  getTeamDetail(id) {
    this.action.showLoading();
    this.teamService.getDetail(id).subscribe((result) => {
      this.dataDetail = result;
      this.bindData(result);
      this.action.hideLoading();
    }, (err) => {
      console.log(err);
      this.action.hideLoading();
    })
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

  bindData(data) {
    this.bindUser(data.team_users);
    this.formDetail.patchValue({
      name: data.name,
      age_max: data.age_max,
      age_min: data.age_min,
      description: data.description,
      area: data.area.name,
      area_id: data.area.id,
      level: data.level.name,
      level_id: data.level.id
    })
  }

  bindUser(listTeamUser) {
    const tmp = [];
    let stt = 1;
    _.forEach(listTeamUser, (item) => {
      let data = [];
      data['teamUser'] = item;
      const itemName = item.is_captain == 1 ? item.user.fullname + '(Đội trưởng)' : item.user.fullname;
      data['content'] = [
        { title: stt },
        { title: itemName },
        { title: item.user.phone }
      ];
      stt++;
      data['actions'] = item.is_captain == 1 ? [''] : ['Delete'];
      tmp.push(data);
    })
    this.listUser = tmp;
  }

  edit() {
    const data = {
      name: this.getValueFormDetail('name'),
      age_max: this.getValueFormDetail('age_max'),
      age_min: this.getValueFormDetail('age_min'),
      level_id: this.getValueFormDetail('level_id'),
      area_id: this.getValueFormDetail('area_id'),
      picture: this.getValueFormDetail('picture'),
      description: this.getValueFormDetail('description'),
      id: this.dataDetail.id
    }
    this.action.showLoading();
    this.teamService.updateTeam(data).subscribe((result) => {
      this.toastrService.success('Cập nhật thành công!', '', { timeOut: 3500 });
      this.editFaild = false;
      this.action.hideLoading();
    }, (err) => {
      this.action.hideLoading();
      this.editFaild = true;
      this.messageError = err.message;
    })
  }

  addMember() {
    const data = {
      member: this.formAddMember.controls['member'].value,
      team_id: this.dataDetail.id,
      is_captain: 0
    }
    this.action.showLoading();
    this.teamService.addMember({ teamUser: data }).subscribe((result) => {
      this.action.hideLoading();
      this.addMemberFaild = false;
      this.formAddMember.reset();
      this.toastrService.success('Thêm thành công!', '', { timeOut: 3000 });
      this.getTeamDetail(this.dataDetail.id);
    }, (err) => {
      this.action.hideLoading();
      this.addMemberFaild = true;
      this.toastrService.success(this.messageErrAddMember, '', { timeOut: 3000 })
      this.messageErrAddMember = err.message;
    })
  }






  handleAction(event) {
    switch (event.action) {
      case 'Delete':
        this.action.showLoading();
        this.teamService.deleteMember({ id: event.item.teamUser.id }).subscribe((result) => {
          this.toastrService.success('Xóa thành công!', '', { timeOut: 3500 });
          this.getTeamDetail(this.dataDetail.id);
        }, (err) => {
          this.action.hideLoading();
          this.toastrService.warning(err.message, '', { timeOut: 3500 });
        })
        break;
    }


  }

  getValueFormDetail(name) {
    return this.formDetail.controls[name].value;
  }

  navToHomeLoginForm() {
    $("#modalLoginForm").modal("show");
  }

  handleDownSelect(event, tab) {
    if (tab == 'area') {
      this.objectAreaEvent = event.value;
      this.formDetail.patchValue({
        area: event.value.area.name,
        area_id: event.value.area.id
      });
    } else {
      this.objectLevelEvent = event.value;
      this.formDetail.patchValue({
        level: event.value.level.name,
        level_id: event.value.level.id
      });
    }
  }
}
