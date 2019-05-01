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
import { Utils } from 'src/app/shared/enums/utils';
import { CareerService } from 'src/app/shared/services/career.service';
import { Career } from 'src/app/shared/classes/career';
import { InfoCommonService } from 'src/app/shared/services/info-common.service';
import { InfoCommon } from 'src/app/shared/classes/info-common';
import { GridironService } from 'src/app/shared/services/gridiron.service';
import { Gridiron } from 'src/app/shared/classes/gridiron';
import { Match } from 'src/app/shared/classes/match';
import { MatchService } from 'src/app/shared/services/match.service';
import { TimeService } from 'src/app/shared/services/helpers/time.service';
declare var $: any;
@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.scss']
})
export class MatchDetailComponent implements OnInit {

  formEdit: FormGroup;
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
  dataObjectDetail;
  status;
  id;
  constructor(private formBuilder: FormBuilder, private areaService: AreaService,
    private levelService: LevelService, private level: Level,
    private careerService: CareerService, private career: Career,
    private infoCommonService: InfoCommonService, private infoCommon: InfoCommon,
    private teamService: TeamService, private team: Team,
    private matchService: MatchService, private timeService: TimeService,
    private gridironServiec: GridironService, private gridiron: Gridiron,
    private toastrService: ToastrService, private action: ComponentActions,
    private area: Area, private router: Router, private route: ActivatedRoute) {
    this.initForm()
    this.getListArea();
    this.getListCareer();
    this.getListLevel();
    this.getListTeam();
    this.getListTime();
    this.getListGridiron();
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params.id;
      this.getDetail(this.id);
    })
  }

  initForm() {
    this.formEdit = this.formBuilder.group({
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
      'invitation': new FormControl(''),
      'status': new FormControl('')
    });
  }

  getDetail(id) {
    this.action.showLoading();
    this.matchService.getDetailLocal(id).subscribe((result) => {
      this.action.hideLoading()
      this.dataObjectDetail = result;
      this.bindData(result);
    }, err => {
      this.action.hideLoading();
      console.log(err);
    })
  }

  bindData(match) {
    this.formEdit.patchValue({
      'date_of_match': this.timeService.formatDateFromTimeUnix(match.date_of_match, 'YYYY-MM-DD'),
      'time': match.time.time_start + ' : ' + match.time.time_end,
      'time_id': match.time.id,
      'team': match.team.name,
      'team_id': match.team.id,
      'gridiron': match.gridiron ? match.gridiron.name : '',
      'gridiron_id': match.gridiron ? match.gridiron.id : '',
      'level': match.level.name,
      'level_id': match.level.id,
      'career': match.career.name,
      'career_id': match.career.id,
      'area_id': match.area.id,
      'area': match.area.name,
      'invitation': match.invitation,
      'status': match.status
    })
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

  cancel() {
    this.status = Utils.STATUS_CANCEL;
    this.edit();
  }

  edit() {
    const data = {
      id: this.id,
      date_of_match: this.getValueFormAdd('date_of_match'),
      invitation: this.getValueFormAdd('invitation')
    }
    data['status'] = this.status ? this.status : undefined;
    data['team'] = this.objectTeamEvent ? this.objectTeamEvent : undefined;
    data['level'] = this.objectLevelEvent ? this.objectLevelEvent : undefined;
    data['time'] = this.objectTimeEvent ? this.objectTimeEvent : undefined;
    data['area'] = this.objectAreaEvent ? this.objectAreaEvent : undefined;
    data['gridiron'] = this.objectGridironEvent ? this.objectGridironEvent : undefined;
    data['career'] = this.objectCareerEvent ? this.objectCareerEvent : undefined;

    this.action.showLoading();
    this.matchService.updateMatch(data).subscribe((result) => {
      this.toastrService.success(Utils.MESSAGE_UPDATE_SUCCESS, '', { timeOut: 3500 });
      this.addFaild = false;
      if (this.status) {
        this.router.navigate(['match']);
      } else {
        this.action.hideLoading();
      }
    }, (err) => {
      this.action.hideLoading();
      this.addFaild = true;
      this.messageError = err.message;
      this.toastrService.error(this.messageError, '', { timeOut: 3500 });
    })
  }

  getValueFormAdd(name) {
    return this.formEdit.controls[name].value;
  }

  handleDownSelect(event, tab) {
    if (tab == 'area') {
      this.objectAreaEvent = event.value.area;
      this.formEdit.patchValue({
        area: event.value.area.name,
        area_id: event.value.area.id
      });
    }
    if (tab == 'level') {
      this.objectLevelEvent = event.value.level;
      this.formEdit.patchValue({
        level: event.value.level.name,
        level_id: event.value.level.id
      });
    }
    if (tab == 'career') {
      this.objectCareerEvent = event.value.career;
      this.formEdit.patchValue({
        career: event.value.career.name,
        career_id: event.value.career.id
      });
    }
    if (tab == 'gridiron') {
      this.objectGridironEvent = event.value.gridiron;
      this.formEdit.patchValue({
        gridiron: event.value.gridiron.name,
        gridiron_id: event.value.gridiron.id
      });
      this.objectAreaEvent = this.objectGridironEvent.area;
      this.formEdit.patchValue({
        area: this.objectAreaEvent.name,
        area_id: this.objectAreaEvent.id
      });
    }
    if (tab == 'time') {
      this.objectTimeEvent = event.value.time;
      this.formEdit.patchValue({
        time: event.value.time.time_start + ' : ' + event.value.time.time_end,
        time_id: event.value.time.id
      });
    }
    if (tab == 'team') {
      this.objectTeamEvent = event.value.team;
      this.formEdit.patchValue({
        team: event.value.team.name,
        team_id: event.value.team.id
      });
    }
  }
}
