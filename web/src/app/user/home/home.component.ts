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
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  listArea;
  listCareer;
  listMatch;
  listLevel;
  listMatchSearch;
  areaForm: FormGroup;
  careerForm: FormGroup;
  levelForm: FormGroup;
  searchForm: FormGroup;
  minDate;
  objectAreaEvent;
  objectCareerEvent;
  objectLevelEvent
  objectMatchEvent;
  listTeam;
  idMatch;
  messageConfirm = '';
  constructor(public user: User,
    private timeService: TimeService, private action: ComponentActions,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private teamService: TeamService, private team: Team,
    private levelService: LevelService, private level: Level,
    private matchService: MatchService, private match: Match,
    private careerService: CareerService, private career: Career,
    private areaService: AreaService, private area: Area) {
    this.minDate = timeService.getDateWithoutTime(new Date());
  }

  ngOnInit() {
    this.initForm();
    this.getListMatch();
    this.getListArea();
    this.getListCareer();
    this.getListLevel();
  }

  initForm() {
    this.areaForm = this.formBuilder.group({
      area: new FormControl('')
    })

    this.careerForm = this.formBuilder.group({
      career: new FormControl('')
    })

    this.levelForm = this.formBuilder.group({
      level: new FormControl('')
    })

    this.searchForm = this.formBuilder.group({
      dateOfMatch: new FormControl(''),
      textSearch: new FormControl('')
    })
  }

  getListMatch() {
    this.action.showLoading();
    this.matchService.getAll().subscribe((result) => {
      this.listMatch = this.setDataMatchPublic(_.reverse(result));
      this.listMatchSearch = this.listMatch;
      this.action.hideLoading();
    }, err => {
      this.action.hideLoading();
      console.log(err)
    })
  }

  setDataMatchPublic(matchs) {
    const tmp = [];
    _.forEach(matchs, (item, key) => {
      if (item.status == Utils.STATUS_WAITTING || item.status == Utils.STATUS_NEW) {
        if (!item.gridiron) {
          item['gridiron'] = {};
          item.gridiron['name'] = '';
          item.gridiron['address'] = '';

        }
        if (!item.career) {
          item['career'] = {};
          item.gridiron['name'] = '';
        }
        item.date_of_match = this.timeService.formatDateFromTimeUnix(item.date_of_match, 'YYYY-MM-DD');
        tmp.push(item)
      }
    })

    const checkNewItem = _.findIndex(matchs, (o) => { return o.status == Utils.STATUS_NEW || o.status == Utils.STATUS_WAITTING })
    if (checkNewItem < 0) {
      _.forEach(matchs, (item, key) => {
        if (tmp.length > 2) { return; }
        if (item.status == Utils.STATUS_EXPIRED) {
          if (!item.gridiron) {
            item['gridiron'] = {};
            item.gridiron['name'] = '';
            item.gridiron['address'] = '';
          }
          if (!item.career) {
            item['career'] = {};
            item.gridiron['name'] = '';
          }
          item.date_of_match = this.timeService.formatDateFromTimeUnix(item.date_of_match, 'YYYY-MM-DD');
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

  getListLevel() {
    this.levelService.getList().subscribe((result) => {
      this.listLevel = this.level.getListForDropdown(result);
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
    if (tab == 'level') {
      this.objectLevelEvent = event.level;
    }
    this.search();
  }

  search() {
    const date = this.searchForm.controls['dateOfMatch'].value;
    const textSearch = this.searchForm.controls['textSearch'].value;
    this.listMatchSearch = this.listMatch;
    if (date) {
      const tmp = _.filter(this.listMatchSearch, (item) => {
        return item.date_of_match == date;
      })
      this.listMatchSearch = _.cloneDeep(tmp);
    }
    if (textSearch) {
      const tmp = [];
      _.forEach(this.listMatchSearch, (item) => {
        if (_.toLower(item.team.name).indexOf(_.toLower(textSearch)) > -1 ||
          _.toLower(item.user.fullname).indexOf(_.toLower(textSearch)) > -1 ||
          _.toLower(item.gridiron.name).indexOf(_.toLower(textSearch)) > -1 ||
          _.toLower(item.gridiron.address).indexOf(_.toLower(textSearch)) > -1 ||
          _.toLower(item.area.name).indexOf(_.toLower(textSearch)) > -1 ||
          _.toLower(item.level.name).indexOf(_.toLower(textSearch)) > -1 ||
          _.toLower(item.career.name).indexOf(_.toLower(textSearch)) > -1 ||
          _.toLower(item.invitation).indexOf(_.toLower(textSearch)) > -1) {
          tmp.push(item);
        }
      });
      this.listMatchSearch = _.cloneDeep(tmp);
    }
    if (this.objectAreaEvent) {
      const tmp = _.filter(this.listMatchSearch, (item) => {
        return _.toLower(item.area.name) == _.toLower(this.objectAreaEvent.name);
      })
      this.listMatchSearch = _.cloneDeep(tmp);
    }
    if (this.objectCareerEvent) {
      const tmp = _.filter(this.listMatchSearch, (item) => {
        return _.toLower(item.career.name) == _.toLower(this.objectCareerEvent.name);
      })
      this.listMatchSearch = _.cloneDeep(tmp);
    }
    if (this.objectLevelEvent) {
      const tmp = _.filter(this.listMatchSearch, (item) => {
        return _.toLower(item.level.name) == _.toLower(this.objectLevelEvent.name);
      })
      this.listMatchSearch = _.cloneDeep(tmp);
    }
  }

  resetFilter() {
    this.objectAreaEvent = null;
    this.objectCareerEvent = null;
    this.objectLevelEvent = null;
    this.search();
  }

  pairMatch(event) {
    if (!localStorage.getItem('token')) {
      $('#modalLoginForm').modal('show');
    }
    this.objectMatchEvent = event;
    this.action.showLoading();
    this.teamService.getListByCaptain().subscribe((result) => {
      this.listTeam = this.team.getListTeamForDropdown(result);
      this.action.hideLoading();
      this.idMatch = event.id;
      $('#modalPairForm').modal('show');
    }, err => {
      this.action.hideLoading();
      console.log(err)
    })
  }

  outputEmit(event) {
    $('#modalPairForm').modal('hide');
    if (event.team.name == this.objectMatchEvent.team.name) {
      this.messageConfirm = 'You can not pair match with your team!';
      $('#confirm').modal('show');
      return;
    } else {
      const data = {
        team_guest: event.team,
        id: this.objectMatchEvent.id,
        status: Utils.STATUS_WAITTING,
        date_of_match: this.objectMatchEvent.date_of_match
      }
      this.action.showLoading();
      this.matchService.updateMatch(data).subscribe((result) => {
        this.action.hideLoading();
        this.toastrService.success('PAIR MATCH SUCCESFULLY', '', { timeOut: 3000 });
      }, err => {
        console.log(err);
        this.action.hideLoading();
        this.toastrService.warning(err.message, '', { timeOut: 3000 });
      })
    }
  }

  saveConfirm() {
    $('#confirm').modal('hide');
  }

  cancelConfirm() {
    $('#confirm').modal('hide');
  }

}
