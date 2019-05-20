
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/classes/user/user';
import { AreaService } from 'src/app/shared/services/area.service';
import { Area } from 'src/app/shared/classes/area';
import { CareerService } from 'src/app/shared/services/career.service';
import { Career } from 'src/app/shared/classes/career';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TimeService } from 'src/app/shared/services/helpers/time.service';
import { Match } from 'src/app/shared/classes/match';
import { ComponentActions } from 'src/app/shared/classes/utils/component-actions';
import * as _ from 'lodash';
import { LevelService } from 'src/app/shared/services/level.service';
import { Level } from 'src/app/shared/classes/level';
import { Utils } from 'src/app/shared/enums/utils';
import { TeamService } from 'src/app/shared/services/team.service';
import { Team } from 'src/app/shared/classes/team';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { LeagueService } from 'src/app/shared/services/league.service';
import { InfoCommon } from 'src/app/shared/classes/info-common';
declare var $: any;
@Component({
  selector: 'app-league-detail',
  templateUrl: './league-detail.component.html',
  styleUrls: ['./league-detail.component.scss']
})
export class LeagueDetailComponent implements OnInit {
  listArea;
  listCareer;
  listMatchSearch;
  areaForm: FormGroup;
  formEdit: FormGroup;
  searchForm: FormGroup;
  minDate;
  objectAreaEvent;
  objectCareerEvent;
  objectLevelEvent
  objectTypeLeague;
  listMatchByRound;
  objectMatch;
  listTeamStandings;
  messageConfirm = '';
  messageError = '';
  id;
  show1 = true;
  show2 = false;
  show3 = false;
  editFaild: boolean = false;
  listTypeOfLeague = [];
  startDate = ''
  dataObjectDetail;
  listRound = [];
  pages = [];
  currentPage = 0;
  currentRound = 1;
  currentMatch
  headers = ['No.', 'Team', 'Played', 'Won', 'Draw', 'Lost', 'For', 'Against', 'GD', 'Points']
  constructor(public user: User,
    private timeService: TimeService, private action: ComponentActions,
    private formBuilder: FormBuilder, private route: ActivatedRoute,
    private toastrService: ToastrService,
    private leagueService: LeagueService, private infoCommon: InfoCommon,
    private teamService: TeamService, private team: Team,
    private levelService: LevelService, private level: Level,
    private careerService: CareerService, private career: Career,
    private areaService: AreaService, private area: Area) {
    this.minDate = timeService.getDateWithoutTime(new Date());
  }

  ngOnInit() {
    this.listTypeOfLeague = this.infoCommon.getListTypeOfCompetition();
    this.startDate = this.timeService.getDateWithoutTime(new Date());
    this.initForm();
    this.getListArea();
    this.getListCareer();
    this.route.params.subscribe((params) => {
      this.id = params.id;
      this.getDetail(this.id);
    })
  }

  initForm() {
    this.areaForm = this.formBuilder.group({
      area: new FormControl('')
    })
    this.formEdit = this.formBuilder.group({
      'date_expiry_register': new FormControl('', Validators.required),
      'number_of_teams': new FormControl('', Validators.required),
      'name_of_league': new FormControl('', Validators.required),
      'type_league': new FormControl('', Validators.required),
      'type_league_id': new FormControl(''),
      'career': new FormControl(''),
      'career_id': new FormControl(''),
      'area_id': new FormControl(''),
      'area': new FormControl('', Validators.required),
      'description': new FormControl(''),
      'status': new FormControl('')
    });
  }

  getDetail(id) {
    this.action.showLoading();
    this.leagueService.getDetail(id).subscribe((result) => {
      this.action.hideLoading()
      console.log(result)
      this.dataObjectDetail = result;
      this.bindData(result);
    }, err => {
      this.action.hideLoading();
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

  getListCareer() {
    this.careerService.getList().subscribe((result) => {
      this.listCareer = this.career.getListForDropdown(result);
    }, (err) => {
      console.log(err)
    })
  }

  bindData(league) {
    for (let i = 1; i <= Math.ceil(this.dataObjectDetail.rounds.length / 10); i++) {
      this.pages.push(i);
    }
    this.paging(0);
    const listTeam = league.list_team ? league.list_team : league.list_team_tmp;
    this.listTeamStandings = this.setListTeamStandings(listTeam);
    this.formEdit.patchValue({
      'status': league.status,
      'date_expiry_register': this.timeService.formatDateFromTimeUnix(league.date_expiry_register, 'YYYY-MM-DD'),
      'number_of_teams': league.number_of_teams,
      'name_of_league': league.name_of_league,
      'type_league': league.type_league.name,
      'type_league_id': league.type_league.id,
      'career': league.career ? league.career.name : '',
      'career_id': league.career ? league.career.id : '',
      'area_id': league.area.id,
      'area': league.area.name,
      'description': league.description
    })
  }

  paging(i) {
    this.currentPage = i;
    this.listRound = _.slice(this.dataObjectDetail.rounds, i * 10, (i + 1) * 10);
  }

  showRound(index, item?) {
    this.currentRound = (this.currentPage * 10) + index + 1;
    this.listMatchByRound = item ? item : this.listRound[index];
    this.setListMatch()
  }

  setListMatch() {
    const tmp = [];
    _.forEach(this.listMatchByRound, (item) => {
      if (item.team1.name == Utils.TEAM_TMP) {
        item['team_relax'] = item.team2.name;
      }
      if (item.team2.name == Utils.TEAM_TMP) {
        item['team_relax'] = item.team1.name;
      }
      tmp.push(item);
    })
    this.listMatchByRound = _.cloneDeep(tmp);
  }

  updateMatch(index) {
    console.log(index + '-' + this.listMatchByRound[index]);...
    this.objectMatch = _.cloneDeep(this.listMatchByRound[index]);
    this.showUpdateMatch();
  }

  showUpdateMatch() {
    $('#update-match').modal('show');
  }

  setListTeamStandings(listTeam) {
    const tmp = [];
    let stt = 1;
    _.forEach(listTeam, (item, key) => {
      let data = [];
      data['content'] = [
        { title: stt },
        { title: item.team.name },
        { title: item.played || 0 },
        { title: item.won || 0 },
        { title: item.draw || 0 },
        { title: item.lost || 0 },
        { title: item.for || 0 },
        { title: item.against || 0 },
        { title: item.goal_difference || 0 },
        { title: item.point || 0 }
      ];
      stt++;
      tmp.push(data)
    })
    return tmp;
  }

  handleDownSelect(event, tab) {
    if (tab == 'area') {
      this.objectAreaEvent = event.value.area;
      this.formEdit.patchValue({
        area: event.value.area.name,
        area_id: event.value.area.id
      });
    }
    if (tab == 'career') {
      this.objectCareerEvent = event.value.career;
      this.formEdit.patchValue({
        career: event.value.career.name,
        career_id: event.value.career.id
      });
    }
    if (tab == 'type') {
      this.objectTypeLeague = event.value.type;
      this.formEdit.patchValue({
        type_league: event.value.type.name,
        type_league_id: event.value.type.id
      });
    }
  }

  edit() {
    const data = {
      name_of_league: this.getValueFormEdit('name_of_league'),
      date_expiry_register: this.getValueFormEdit('date_expiry_register'),
      career: { id: this.getValueFormEdit('career_id'), name: this.getValueFormEdit('career') },
      area: { id: this.getValueFormEdit('area_id'), name: this.getValueFormEdit('area') },
      type_league: { id: this.getValueFormEdit('type_league_id'), name: this.getValueFormEdit('type_league') },
      description: this.getValueFormEdit('description'),
      number_of_teams: this.getValueFormEdit('number_of_teams'),
      id: this.dataObjectDetail.id
    }

    this.action.showLoading();
    this.leagueService.updateLeague(data).subscribe((result) => {
      this.toastrService.success(Utils.MESSAGE_UPDATE_SUCCESS, '', { timeOut: 3500 });
      this.editFaild = false;
      this.action.hideLoading();
    }, (err) => {
      this.editFaild = true;
      this.messageError = err.message;
      this.toastrService.error(this.messageError, '', { timeOut: 3500 });
    })
  }

  show(tab) {
    switch (tab) {
      case '1':
        this.show1 = true;
        this.show2 = false;
        this.show3 = false;
        break;
      case '2':
        this.show1 = false;
        this.show2 = true;
        this.show3 = false;
        break;
      case '3':
        this.show1 = false;
        this.show2 = false;
        this.show3 = true;
        this.showRound(0);
        break;
    }
  }

  getValueFormEdit(name) {
    return this.formEdit.controls[name].value;
  }

  saveConfirm() {
    $('#confirm').modal('hide');
  }

  cancelConfirm() {
    $('#confirm').modal('hide');
  }

  emitDataMatch(event) {
    let data = event;
    data['id'] = this.id;
    data['current_round'] = this.currentRound;
    this.action.showLoading();
    this.leagueService.updateMatch(event).subscribe((result) => {
      this.action.hideLoading();
      this.toastrService.success(Utils.MESSAGE_UPDATE_SUCCESS, '', { timeOut: 3000 });
    }, err => {
      this.action.hideLoading();
      this.toastrService.warning(err.message, '', { timeOut: 3000 });
    })
  }

}
