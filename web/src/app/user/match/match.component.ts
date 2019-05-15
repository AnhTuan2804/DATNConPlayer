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
import { Router } from '@angular/router';
import { Utils } from 'src/app/shared/enums/utils';
import { CareerService } from 'src/app/shared/services/career.service';
import { Career } from 'src/app/shared/classes/career';
import { InfoCommonService } from 'src/app/shared/services/info-common.service';
import { InfoCommon } from 'src/app/shared/classes/info-common';
import { GridironService } from 'src/app/shared/services/gridiron.service';
import { Gridiron } from 'src/app/shared/classes/gridiron';
import { Match } from 'src/app/shared/classes/match';
import { MatchService } from 'src/app/shared/services/match.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import { TimeService } from 'src/app/shared/services/helpers/time.service';
declare var $: any;
@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {


  formAdd: FormGroup;
  addFaild: boolean = false;
  messageError: string = "";
  headers = ['No.', 'Date', 'Time', 'Status', 'Guest Team', 'Actions'];
  listArea = [];
  listLevel = [];
  listCareer = [];
  listTeam = [];
  listGridiron = [];
  listTime = [];
  listMatch = [];
  showEditForm = false;
  objectAreaEvent;
  objectLevelEvent;
  objectCareerEvent;
  objectTeamEvent;
  objectGridironEvent;
  objectTimeEvent;
  selectedIndex;
  userDetail;
  startDate;
  isShow = true;
  constructor(private formBuilder: FormBuilder, private areaService: AreaService,
    private levelService: LevelService, private level: Level,
    private careerService: CareerService, private career: Career,
    private infoCommonService: InfoCommonService, private infoCommon: InfoCommon,
    private teamService: TeamService, private team: Team,
    private match: Match, private matchService: MatchService,
    private gridironServiec: GridironService, private gridiron: Gridiron,
    private toastrService: ToastrService, private action: ComponentActions,
    private area: Area, private router: Router, private userService: UserService,
    public db: AngularFireDatabase, private timeService: TimeService) {
    this.initForm()
    this.getListArea();
    this.getListCareer();
    this.getListLevel();
    this.getListTeam();
    this.getListTime();
    this.getListGridiron();
  }

  ngOnInit() {
    this.action.showLoading();
    this.userService.getProfile().subscribe((user) => {
      this.userDetail = user;
      this.getListHistory(user.email);
    }, err => {
      this.action.hideLoading();
    })
    this.startDate = this.timeService.getDateWithoutTime(new Date());
  }

  getListHistory(email) {
    this.matchService.getAll().subscribe((result) => {
      result = _.reverse(result)
      console.log(result);
      this.listMatch = this.match.setData(result, email);
      this.action.hideLoading();
    }, err => {
      this.action.hideLoading();
      console.log(err.message)
    })
  }

  initForm() {
    this.formAdd = this.formBuilder.group({
      'date_of_match': new FormControl('', Validators.required),
      'time': new FormControl('', Validators.required),
      'time_id': new FormControl(''),
      'team': new FormControl('', Validators.required),
      'team_id': new FormControl(''),
      'gridiron': new FormControl(''),
      'gridiron_id': new FormControl(''),
      'level': new FormControl('', Validators.required),
      'level_id': new FormControl(''),
      'career': new FormControl('', Validators.required),
      'career_id': new FormControl(''),
      'area_id': new FormControl(''),
      'area': new FormControl('', Validators.required),
      'invitation': new FormControl('')
    });
  }

  getListTime() {
    this.infoCommonService.getListTime().subscribe((result) => {
      this.listTime = this.infoCommon.getListTimeForDropDown(result);
    }, (err) => {
      console.log(err)
    })
  }

  getListGridiron() {
    this.gridironServiec.getListForAdmin().subscribe((result) => {
      this.listGridiron = this.gridiron.getListForDropdown(result);
    }, (err) => {
      console.log(err)
    })
  }

  getListTeam() {
    this.teamService.getListByCaptain().subscribe((result) => {
      this.listTeam = this.team.getListTeamForDropdown(result);
    }, (err) => {
      console.log(err);
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

  getListCareer() {
    this.careerService.getList().subscribe((result) => {
      this.listCareer = this.career.getListForDropdown(result);
    }, (err) => {
      console.log(err)
    })
  }

  add() {
    const data = {
      area: this.objectAreaEvent,
      level: this.objectLevelEvent,
      time: this.objectTimeEvent,
      team: this.objectTeamEvent,
      gridiron: this.objectGridironEvent,
      career: this.objectCareerEvent,
      date_of_match: this.getValueFormAdd('date_of_match'),
      invitation: this.getValueFormAdd('invitation'),
      status: Utils.STATUS_NEW
    }

    data.time['name'] = this.objectTimeEvent.time_start + 'h - ' + this.objectTimeEvent.time_end + 'h'

    this.action.showLoading();
    this.matchService.createMatch(data).subscribe((result) => {
      this.toastrService.success(Utils.MESSAGE_CREATE_SUCCESS, '', { timeOut: 3500 });
      this.addFaild = false;
      this.formAdd.reset();
      this.action.hideLoading();
    }, (err) => {
      this.addFaild = true;
      this.messageError = err.message;
      this.toastrService.error(this.messageError, '', { timeOut: 3500 });
    })
  }

  handleAction(event) {
    switch (event.action) {
      case 'Delete':
        this.action.showLoading();
        this.teamService.deleteTeam({ id: event.item.teamUser.team.id }).subscribe((result) => {
          this.toastrService.success(Utils.MESSAGE_DELETE_SUCCESS, '', { timeOut: 3500 });
          this.getListTeam();
        }, (err) => {
          this.action.hideLoading();
          this.toastrService.success(err.message, '', { timeOut: 3500 });
        })
        break;
      case 'Edit':
        this.navToDetail(event.item.match.id);
        break;
    }
  }

  getValueFormAdd(name) {
    return this.formAdd.controls[name].value;
  }

  navToDetail(id, view?) {
    const path = `match/edit/${id}`;
    this.router.navigate([path]);
  }

  handleDownSelect(event, tab) {
    if (tab == 'area') {
      this.objectAreaEvent = event.value.area;
      this.formAdd.patchValue({
        area: event.value.area.name,
        area_id: event.value.area.id
      });
    }
    if (tab == 'level') {
      this.objectLevelEvent = event.value.level;
      this.formAdd.patchValue({
        level: event.value.level.name,
        level_id: event.value.level.id
      });
    }
    if (tab == 'career') {
      this.objectCareerEvent = event.value.career;
      this.formAdd.patchValue({
        career: event.value.career.name,
        career_id: event.value.career.id
      });
    }
    if (tab == 'gridiron') {
      this.objectGridironEvent = event.value.gridiron;
      this.formAdd.patchValue({
        gridiron: event.value.gridiron.name,
        gridiron_id: event.value.gridiron.id
      });
      this.objectAreaEvent = this.objectGridironEvent.area;
      this.formAdd.patchValue({
        area: this.objectAreaEvent.name,
        area_id: this.objectAreaEvent.id
      })
    }
    if (tab == 'time') {
      this.objectTimeEvent = event.value.time;
      this.formAdd.patchValue({
        time: event.value.time.time_start + ' : ' + event.value.time.time_end,
        time_id: event.value.time.id
      });
    }
    if (tab == 'team') {
      this.objectTeamEvent = event.value.team;
      this.formAdd.patchValue({
        team: event.value.team.name,
        team_id: event.value.team.id
      });
    }
  }

  actionForm(tab) {
    this.isShow = tab == 'show' ? false : true;
  
}
