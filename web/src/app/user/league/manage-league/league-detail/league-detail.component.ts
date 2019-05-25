
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/classes/user/user';
import { AreaService } from 'src/app/shared/services/area.service';
import { Area } from 'src/app/shared/classes/area';
import { CareerService } from 'src/app/shared/services/career.service';
import { Career } from 'src/app/shared/classes/career';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TimeService } from 'src/app/shared/services/helpers/time.service';
import { ComponentActions } from 'src/app/shared/classes/utils/component-actions';
import * as _ from 'lodash';
import { Utils } from 'src/app/shared/enums/utils';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { LeagueService } from 'src/app/shared/services/league.service';
import { InfoCommon } from 'src/app/shared/classes/info-common';
import { Title } from '@angular/platform-browser';
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
  objectTeamRegisterEvent;
  objectMatch;
  listTeamStandings;
  listTeamRegister = [];
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
  currentMatch;
  view;
  isShowListTeam = true;
  isRegistering = false;
  headers = ['No.', 'Team', 'Played', 'Won', 'Draw', 'Lost', 'For', 'Against', 'GD', 'Points'];
  headersTeamRegister = ['No', 'Name of team', 'Action'];
  constructor(public user: User,
    private timeService: TimeService, private action: ComponentActions,
    private formBuilder: FormBuilder, private route: ActivatedRoute,
    private toastrService: ToastrService,
    private titleService: Title,
    private leagueService: LeagueService, private infoCommon: InfoCommon,
    private careerService: CareerService, private career: Career,
    private areaService: AreaService, private area: Area) {
    this.minDate = timeService.getDateWithoutTime(new Date());
  }

  ngOnInit() {
    this.titleService.setTitle('League Detail page');
    this.listTypeOfLeague = this.infoCommon.getListTypeOfCompetition();
    this.startDate = this.timeService.getDateWithoutTime(new Date());
    this.initForm();
    this.getListArea();
    this.getListCareer();
    this.route.params.subscribe((params) => {
      const item = params.item;
      if (item == 'view') {
        this.view = true;
      }
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
      this.dataObjectDetail['list_team'] = this.dataObjectDetail.list_team || [];
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
    this.pages = []
    for (let i = 1; i <= Math.ceil(this.dataObjectDetail.rounds.length / 10); i++) {
      this.pages.push(i);
    }
    this.isShowListTeam = this.timeService.getTimeUnixFromTimeFormatYMD(this.timeService.getDateWithoutTime(null)) <= this.dataObjectDetail.date_expiry_register ? true : false;
    this.paging(0);
    this.listTeamStandings = this.setListTeamStandings(league.list_team_tmp);
    this.listTeamRegister = this.setListTeamRegister(league.list_team || [])
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
    this.showRound(this.currentRound - (this.currentPage * 10 + 1));
  }

  showRound(index, item?) {
    this.currentRound = (this.currentPage * 10) + index + 1;
    this.listMatchByRound = item ? item : this.dataObjectDetail.rounds[this.currentRound - 1];
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
    this.currentMatch = index;
    this.objectMatch = {};
    this.objectMatch['league_id'] = this.id;
    this.objectMatch['current_round'] = this.currentRound - (this.currentPage * 10 + 1);
    this.objectMatch['current_match'] = index;
    this.objectMatch = _.cloneDeep(this.objectMatch);
    this.isRegistering = this.timeService.getTimeUnixFromTimeFormatYMD(this.timeService.getDateWithoutTime(null)) <= this.dataObjectDetail.date_expiry_register ? true : false;
    this.showUpdateMatch();
  }

  showUpdateMatch() {
    $('#update-match').modal('show');
  }

  setListTeamRegister(listTeam) {
    const tmp = [];
    let stt = 1;
    _.forEach(listTeam, (item, key) => {
      let data = [];
      data['team'] = item;
      data['content'] = [
        { title: stt },
        { title: item.team.name }
      ];
      stt++;
      data['actions'] = ['Delete'];
      tmp.push(data)
    })
    return tmp;
  }

  setListTeamStandings(listTeam) {
    listTeam = _.reverse(_.sortBy(listTeam, ['point', 'goal_diffrence', 'for']));
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
        { title: item.goal_diffrence || 0 },
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
      id: this.id
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

  handleAction(event) {
    switch (event.action) {
      case 'Delete':
        this.messageConfirm = 'Are you sure delete this team?'
        $('#confirm-del').modal('show');
        this.objectTeamRegisterEvent = event;
        break;
    }
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
    const data = this.objectTeamRegisterEvent.item.team;
    data['id'] = this.id;
    this.action.showLoading();
    this.leagueService.cancelTeam(data).subscribe((result) => {
      this.action.hideLoading();
      this.toastrService.success('REMOVE TEAM SUCCESSFULLY', '', { timeOut: 3000 });
    }, err => {
      this.action.hideLoading();
      this.toastrService.warning('REMOVE TEAM SUCCESSFULLY', '', { timeOut: 3000 });
    })
    $('#confirm-del').modal('hide');
  }

  cancelConfirm() {
    $('#confirm-del').modal('hide');
  }

  emitDataMatch(event) {

  }

}
