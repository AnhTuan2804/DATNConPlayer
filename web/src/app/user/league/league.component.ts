import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/classes/user/user';
import { AreaService } from 'src/app/shared/services/area.service';
import { Area } from 'src/app/shared/classes/area';
import { CareerService } from 'src/app/shared/services/career.service';
import { Career } from 'src/app/shared/classes/career';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { TimeService } from 'src/app/shared/services/helpers/time.service';
import { MatchService } from 'src/app/shared/services/match.service';
import { Match } from 'src/app/shared/classes/match';
import { ComponentActions } from 'src/app/shared/classes/utils/component-actions';
import * as _ from 'lodash';
import { LevelService } from 'src/app/shared/services/level.service';
import { Level } from 'src/app/shared/classes/level';
import { Utils } from 'src/app/shared/enums/utils';
import { TeamService } from 'src/app/shared/services/team.service';
import { Team } from 'src/app/shared/classes/team';
import { ToastrService } from 'ngx-toastr';
import { LeagueService } from 'src/app/shared/services/league.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
declare var $: any;
@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss']
})
export class LeagueComponent implements OnInit {
  listArea;
  listCareer;
  listLeague;
  listLevel;
  listLeagueSearch;
  areaForm: FormGroup;
  careerForm: FormGroup;
  levelForm: FormGroup;
  searchForm: FormGroup;
  minDate;
  objectAreaEvent;
  objectCareerEvent;
  objectLevelEvent
  objectLeagueEvent;
  listTeam;
  messageConfirm = '';
  constructor(public user: User,
    private timeService: TimeService, private action: ComponentActions,
    private formBuilder: FormBuilder,
    private route: Router,
    private titleService: Title,
    private leagueService: LeagueService,
    private toastrService: ToastrService,
    private teamService: TeamService, private team: Team,
    private careerService: CareerService, private career: Career,
    private areaService: AreaService, private area: Area) {
    this.minDate = timeService.getDateWithoutTime(new Date());
  }

  ngOnInit() {
    this.titleService.setTitle('Search League page');
    this.initForm();
    this.getListLeague();
    this.getListArea();
    this.getListCareer();
  }

  initForm() {
    this.areaForm = this.formBuilder.group({
      area: new FormControl('')
    })

    this.careerForm = this.formBuilder.group({
      career: new FormControl('')
    })

    this.searchForm = this.formBuilder.group({
      textSearch: new FormControl('')
    })
  }

  getListLeague() {
    this.action.showLoading();
    this.leagueService.getAll().subscribe((result) => {
      this.listLeague = this.setDataMatchPublic(_.reverse(result));
      this.listLeagueSearch = this.listLeague;
      console.log(this.listLeague)
      this.action.hideLoading();
    }, err => {
      this.action.hideLoading();
      console.log(err)
    })
  }

  setDataMatchPublic(leagues) {
    const tmp = [];
    _.forEach(leagues, (item, key) => {
      if (item.status == Utils.STATUS_NEW || item.status == Utils.STATUS_INPROGRESS) {
        if (!item.career) {
          item['career'] = {};
          item.career['name'] = '';
        }
        item.date_expiry_register = this.timeService.formatDateFromTimeUnix(item.date_expiry_register, 'YYYY-MM-DD');
        tmp.push(item)
      }
    })

    const checkNewItem = _.findIndex(leagues, (o) => { return o.status == Utils.STATUS_NEW || o.status == Utils.STATUS_INPROGRESS })
    if (checkNewItem < 0) {
      _.forEach(leagues, (item, key) => {
        if (tmp.length > 2) { return; }
        if (item.status == Utils.STATUS_COMPLETE) {
          if (!item.career) {
            item['career'] = {};
            item.career['name'] = '';
          }
          item.date_expiry_register = this.timeService.formatDateFromTimeUnix(item.date_expiry_register, 'YYYY-MM-DD');
          tmp.push(item)
        }
      })
    }
    return tmp;
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

  changeSelectRadio(event, tab) {
    if (tab == 'area') {
      this.objectAreaEvent = event.area;
    }
    if (tab == 'career') {
      this.objectCareerEvent = event.career;
    }
    this.search();
  }

  search() {
    const textSearch = this.searchForm.controls['textSearch'].value;
    this.listLeagueSearch = this.listLeague;

    if (textSearch) {
      const tmp = [];
      _.forEach(this.listLeagueSearch, (item) => {
        if (_.toLower(item.name_of_league).indexOf(_.toLower(textSearch)) > -1 ||
          _.toLower(item.area.name).indexOf(_.toLower(textSearch)) > -1 ||
          _.toLower(item.career.name).indexOf(_.toLower(textSearch)) > -1 ||
          _.toLower(item.description).indexOf(_.toLower(textSearch)) > -1 ||
          _.toLower(item.status).indexOf(_.toLower(textSearch)) > -1 ||
          _.toLower(item.type_league.name).indexOf(_.toLower(textSearch)) > -1) {
          tmp.push(item);
        }
      });
      this.listLeagueSearch = _.cloneDeep(tmp);
    }
    if (this.objectAreaEvent) {
      const tmp = _.filter(this.listLeagueSearch, (item) => {
        return _.toLower(item.area.name) == _.toLower(this.objectAreaEvent.name);
      })
      this.listLeagueSearch = _.cloneDeep(tmp);
    }
    if (this.objectCareerEvent) {
      const tmp = _.filter(this.listLeagueSearch, (item) => {
        return _.toLower(item.career.name) == _.toLower(this.objectCareerEvent.name);
      })
      this.listLeagueSearch = _.cloneDeep(tmp);
    }
  }

  navigate(event) {
    this.route.navigate([`league/view/${event}`])
  }

  resetFilter() {
    this.objectAreaEvent = null;
    this.objectCareerEvent = null;
    this.search();
  }

  register(event) {
    if (!localStorage.getItem('token')) {
      $('#modalLoginForm').modal('show');
    }
    this.objectLeagueEvent = event;
    this.action.showLoading();
    this.teamService.getListByCaptain().subscribe((result) => {
      this.listTeam = this.team.getListTeamForDropdown(result);
      this.action.hideLoading();
      $('#modalPairForm').modal('show');
    }, err => {
      this.action.hideLoading();
      console.log(err)
    })
  }

  outputEmit(event) {
    $('#modalPairForm').modal('hide');
    //check neu team da ton tai thi thong bao.
    if (this.objectLeagueEvent.list_team) {
      if ((_.findIndex(this.objectLeagueEvent.list_team, (o) => { return o.team.name == event.team.name }) > -1)) {
        this.messageConfirm = `This team was join league  <<${this.objectLeagueEvent.name_of_league}>>`;
        $('#confirm').modal('show');
        return;
      }
    }

    const data = {
      id: this.objectLeagueEvent.id,
      team: {
        name: event.team.name,
        id: event.team.id
      }
    }
    this.action.showLoading();
    this.leagueService.register(data).subscribe((result) => {
      this.action.hideLoading();
      this.toastrService.success('REGISTER SUCCESFULLY', '', { timeOut: 3000 });
    }, err => {
      console.log(err);
      this.action.hideLoading();
      this.toastrService.warning(err.message, '', { timeOut: 3000 });
    })
  }

  saveConfirm() {
    $('#confirm').modal('hide');
  }

  cancelConfirm() {
    $('#confirm').modal('hide');
  }


}
