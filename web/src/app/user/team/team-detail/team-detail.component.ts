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
import { Career } from 'src/app/shared/classes/career';
import { CareerService } from 'src/app/shared/services/career.service';
import { Utils } from 'src/app/shared/enums/utils';
import { Title } from '@angular/platform-browser';
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
  headers = ['No.', 'Name of member', 'Phone', 'Actions'];
  listArea = [];
  listLevel = [];
  listUser = [];
  listCareer = [];
  showEditForm = false;
  objectAreaEvent;
  objectLevelEvent;
  selectedIndex;
  view: boolean = false;
  dataDetail;
  objectDeleteEvent;
  constructor(private formBuilder: FormBuilder, private areaService: AreaService,
    private levelService: LevelService, private level: Level,
    private teamService: TeamService, private team: Team,
    private careerService: CareerService, private career: Career,
    private toastrService: ToastrService, private action: ComponentActions,
    private titleService: Title,
    private area: Area, private router: Router, private route: ActivatedRoute) {
    this.initForm()
    this.getListArea();
    this.getListLevel();
    this.getListCareer();
  }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.navToHomeLoginForm();
    }
    this.titleService.setTitle('Team detail page');
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
      'career': new FormControl('', Validators.required),
      'career_id': new FormControl(''),
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

  getListCareer() {
    this.careerService.getList().subscribe((result) => {
      this.listCareer = this.career.getListForDropdown(result);
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
      level_id: data.level.id,
      career: data.career.name,
      career_id: data.career.id,
    })
  }

  bindUser(listTeamUser) {
    const tmp = [];
    let stt = 1;
    _.forEach(listTeamUser, (item) => {
      let data = [];
      data['teamUser'] = item;
      const itemName = item.is_captain == 1 ? item.user.fullname + '(Captain)' : item.user.fullname;
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
      career_id: this.getValueFormDetail('career_id'),
      picture: this.getValueFormDetail('picture'),
      description: this.getValueFormDetail('description'),
      id: this.dataDetail.id
    }
    this.action.showLoading();
    this.teamService.updateTeam(data).subscribe((result) => {
      this.toastrService.success(Utils.MESSAGE_UPDATE_SUCCESS, '', { timeOut: 3500 });
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
      this.toastrService.success(Utils.MESSAGE_CREATE_SUCCESS, '', { timeOut: 3000 });
      this.getTeamDetail(this.dataDetail.id);
    }, (err) => {
      this.action.hideLoading();
      this.addMemberFaild = true;
      this.messageErrAddMember = err.message;
      this.toastrService.success(this.messageErrAddMember, '', { timeOut: 3000 })
    })
  }

  handleAction(event) {
    switch (event.action) {
      case 'Delete':
        $('#delete-member').modal('show');
        this.objectDeleteEvent = event;
        break;
    }
  }

  saveConfirm() {
    $('#delete-member').modal('hide');
    this.deleteMember();
  }

  cancelConfirm() {
    $('#delete-member').modal('hide');
    this.objectDeleteEvent = null;
  }

  deleteMember() {
    this.action.showLoading();
    this.teamService.deleteMember({ id: this.objectDeleteEvent.item.teamUser.id }).subscribe((result) => {
      this.toastrService.success(Utils.MESSAGE_DELETE_SUCCESS, '', { timeOut: 3500 });
      this.getTeamDetail(this.dataDetail.id);
    }, (err) => {
      this.action.hideLoading();
      this.toastrService.warning(err.message, '', { timeOut: 3500 });
    })
  }

  getValueFormDetail(name) {
    return this.formDetail.controls[name].value;
  }

  navToHomeLoginForm() {
    $("#modalLoginForm").modal("show");
  }

  handleDownSelect(event, tab) {
    if (tab == 'area') {
      this.formDetail.patchValue({
        area: event.value.area.name,
        area_id: event.value.area.id
      });
    }
    if (tab == 'level') {
      this.formDetail.patchValue({
        level: event.value.level.name,
        level_id: event.value.level.id
      });
    }
    if (tab == 'career') {
      this.formDetail.patchValue({
        career: event.value.career.name,
        career_id: event.value.career.id
      });
    }
  }
}
