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
import { UserService } from 'src/app/shared/services/user.service';
import { TimeService } from 'src/app/shared/services/helpers/time.service';
import { LeagueService } from 'src/app/shared/services/league.service';
import { League } from 'src/app/shared/classes/league';
declare var $: any;
@Component({
  selector: 'app-manage-league',
  templateUrl: './manage-league.component.html',
  styleUrls: ['./manage-league.component.scss']
})
export class ManageLeagueComponent implements OnInit {

  formAdd: FormGroup;
  addFaild: boolean = false;
  messageError: string = "";
  headers = ['No.', 'Name Of League', 'Date Expiry Register', 'Number Of Team Register', 'Status', 'Actions'];
  listArea = [];
  listLevel = [];
  listCareer = [];
  listTeam = [];
  listGridiron = [];
  listTime = [];
  listMatch = [];
  listLeague = [];
  listTypeOfLeague = [];
  showEditForm = false;
  objectAreaEvent;
  objectLevelEvent;
  objectCareerEvent;
  objectTeamEvent;
  objectGridironEvent;
  objectTimeEvent;
  objectTypeLeague;
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
    private leagueService: LeagueService, private league: League,
    private gridironServiec: GridironService, private gridiron: Gridiron,
    private toastrService: ToastrService, private action: ComponentActions,
    private area: Area, private router: Router, private userService: UserService,
    public db: AngularFireDatabase, private timeService: TimeService) {
    this.initForm()
    this.getListArea();
    this.getListCareer();
    this.getListLeagueByEmail();
  }

  ngOnInit() {
    this.listTypeOfLeague = this.infoCommon.getListTypeOfCompetition();
    this.startDate = this.timeService.getDateWithoutTime(new Date());
  }

  getListLeagueByEmail() {
    this.action.showLoading();
    this.userService.getProfile().subscribe((user) => {
      this.leagueService.getListForUser(user.email).subscribe((result) => {
        result = _.reverse(result)
        console.log(result);
        this.listLeague = this.league.setData(result);
        this.action.hideLoading();
      }, err => {
        this.action.hideLoading();
        console.log(err.message)
      })
    })

  }

  initForm() {
    this.formAdd = this.formBuilder.group({
      'date_expiry_register': new FormControl('', Validators.required),
      'number_of_teams': new FormControl('', Validators.required),
      'name_of_league': new FormControl('', Validators.required),
      'type_league': new FormControl('', Validators.required),
      'type_league_id': new FormControl(''),
      'career': new FormControl(''),
      'career_id': new FormControl(''),
      'area_id': new FormControl(''),
      'area': new FormControl('', Validators.required),
      'description': new FormControl('')
    });
  }


  // getListTime() {
  //   this.infoCommonService.getListTime().subscribe((result) => {
  //     this.listTime = this.infoCommon.getListTimeForDropDown(result);
  //   }, (err) => {
  //     console.log(err)
  //   })
  // }

  // getListGridiron() {
  //   this.gridironServiec.getListForAdmin().subscribe((result) => {
  //     this.listGridiron = this.gridiron.getListForDropdown(result);
  //   }, (err) => {
  //     console.log(err)
  //   })
  // }

  // getListTeam() {
  //   this.teamService.getListByCaptain().subscribe((result) => {
  //     this.listTeam = this.team.getListTeamForDropdown(result);
  //   }, (err) => {
  //     console.log(err);
  //   })
  // }

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

  getListLeague() {
    this.action.hideLoading();
  }

  add() {
    const data = {
      name_of_league: this.getValueFormAdd('name_of_league'),
      date_expiry_register: this.getValueFormAdd('date_expiry_register'),
      career: this.objectCareerEvent ? this.objectCareerEvent : undefined,
      area: this.objectAreaEvent,
      type_league: this.objectTypeLeague,
      description: this.getValueFormAdd('description'),
      status: Utils.STATUS_NEW,
      number_of_teams: this.getValueFormAdd('number_of_teams')
    }

    this.action.showLoading();
    this.leagueService.createLeague(data).subscribe((result) => {
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
      case 'Edit':
        this.navToDetail(event.item.league.id, 'Edit');
        break;
      case 'View':
        this.navToDetail(event.item.league.id, 'View');
        break;
    }
  }

  getValueFormAdd(name) {
    return this.formAdd.controls[name].value;
  }

  navToDetail(id, tab) {
    let path;
    if (tab == 'Edit') {
      path = `league/edit/${id}`;
    } else {
      path = `league/view/${id}`;
    }
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
    if (tab == 'career') {
      this.objectCareerEvent = event.value.career;
      this.formAdd.patchValue({
        career: event.value.career.name,
        career_id: event.value.career.id
      });
    }
    if (tab == 'type') {
      this.objectTypeLeague = event.value.type;
      this.formAdd.patchValue({
        type_league: event.value.type.name,
        type_league_id: event.value.type.id
      });
    }
  }

  actionForm(tab) {
    this.isShow = tab == 'show' ? false : true;
  }
}

