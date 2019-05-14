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
import { GridironService } from 'src/app/shared/services/gridiron.service';
import { Gridiron } from 'src/app/shared/classes/gridiron';
declare var $: any;

@Component({
  selector: 'app-home-gridiron',
  templateUrl: './home-gridiron.component.html',
  styleUrls: ['./home-gridiron.component.scss']
})
export class HomeGridironComponent implements OnInit {
  listArea;
  listGridiron;
  listMatch;
  listLevel;
  listSearch;
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
    private gridironService: GridironService, private gridiron: Gridiron,
    private teamService: TeamService, private team: Team,
    private matchService: MatchService,
    private areaService: AreaService, private area: Area) {
    this.minDate = timeService.getDateWithoutTime(new Date());
  }

  ngOnInit() {
    this.initForm();
    this.getListArea();
    this.getListGridiron();
  }

  initForm() {
    this.areaForm = this.formBuilder.group({
      area: new FormControl('')
    })

    this.searchForm = this.formBuilder.group({
      dateOfMatch: new FormControl(''),
      textSearch: new FormControl('')
    })
  }

  getListArea() {
    this.areaService.getList().subscribe((result) => {
      this.listArea = this.area.getListAreaForDropdown(result);
    }, (err) => {
      console.log(err)
    })
  }

  getListGridiron() {
    this.action.showLoading();
    this.gridironService.getListPublic().subscribe((result) => {
      this.listGridiron = result;
      this.listSearch = result;
      console.log(this.listGridiron)
      this.action.hideLoading();
    }, (err) => {
      console.log(err)
    })
  }

  changeSelectRadio(event, tab) {
    if (tab == 'area') {
      this.objectAreaEvent = event.area;
    }
    this.search();
  }

  search() {
    const textSearch = this.searchForm.controls['textSearch'].value;
    this.listSearch = this.listGridiron;
    if (textSearch) {
      const tmp = [];
      _.forEach(this.listSearch, (item) => {
        if (_.toLower(item.name).indexOf(_.toLower(textSearch)) > -1 ||
          _.toLower(item.phone).indexOf(_.toLower(textSearch)) > -1 ||
          _.toLower(item.description).indexOf(_.toLower(textSearch)) > -1 ||
          _.toLower(item.address).indexOf(_.toLower(textSearch)) > -1 ||
          _.toLower(item.area.name).indexOf(_.toLower(textSearch)) > -1) {
          tmp.push(item);
        }
      });
      this.listSearch = _.cloneDeep(tmp);
    }
    if (this.objectAreaEvent) {
      const tmp = _.filter(this.listSearch, (item) => {
        return _.toLower(item.area.name) == _.toLower(this.objectAreaEvent.name);
      })
      this.listSearch = _.cloneDeep(tmp);
    }
  }

  resetFilter() {
    this.objectAreaEvent = null;
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

