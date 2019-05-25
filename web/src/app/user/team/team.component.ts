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
declare var $: any;

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  formAdd: FormGroup;
  addFaild: boolean = false;
  messageError: string = "";
  headers = ['No.', 'Name of team', 'Actions'];
  listArea = [];
  listLevel = [];
  listCareer = [];
  listTeam = [];
  showEditForm = false;
  objectAreaEvent;
  objectLevelEvent;
  selectedIndex;
  objectDeleteEvent;
  isShow = true;
  constructor(private formBuilder: FormBuilder, private areaService: AreaService,
    private levelService: LevelService, private level: Level,
    private careerService: CareerService, private career: Career,
    private teamService: TeamService, private team: Team,
    private toastrService: ToastrService, private action: ComponentActions,
    private area: Area, private router: Router) {
    this.initForm()
    this.getListArea();
    this.getListCareer();
    this.getListLevel();
    this.getListTeam();
  }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.navToHomeLoginForm();
    }
  }

  initForm() {
    this.formAdd = this.formBuilder.group({
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
  }

  getListTeam() {
    this.action.showLoading();
    if (localStorage.getItem('role') && localStorage.getItem('role') == 'Admin') {
      this.teamService.getListForAdmin().subscribe((result) => {
        console.log(result)
        this.listTeam = this.team.setteam(result, 'Admin');
        this.action.hideLoading();
      }, (err) => {
        console.log(err);
        this.action.hideLoading();
      })
    } else {
      this.teamService.getListForUser().subscribe((result) => {
        this.listTeam = this.team.setteam(result, 'Normal');
        this.action.hideLoading();
      }, (err) => {
        console.log(err);
        this.action.hideLoading();
      })
    }
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
      name: this.getValueFormAdd('name'),
      age_max: this.getValueFormAdd('age_max'),
      age_min: this.getValueFormAdd('age_min'),
      level_id: this.getValueFormAdd('level_id'),
      area_id: this.getValueFormAdd('area_id'),
      career_id: this.getValueFormAdd('career_id'),
      picture: this.getValueFormAdd('picture'),
      description: this.getValueFormAdd('description'),
    }
    this.action.showLoading();
    this.teamService.createTeam({ team: data }).subscribe((result) => {
      this.toastrService.success(Utils.MESSAGE_CREATE_SUCCESS, '', { timeOut: 3500 });
      this.addFaild = false;
      this.formAdd.reset();
      this.getListTeam();
    }, (err) => {
      this.action.hideLoading();
      this.addFaild = true;
      this.messageError = err.message;
      this.toastrService.error(this.messageError, '', { timeOut: 3500 });
    })
  }

  handleAction(event) {
    switch (event.action) {
      case 'Delete':
        $('#confirm').modal('show');
        this.objectDeleteEvent = event;
        break;
      case 'Edit':
        this.navToDetail(event.item.team.id);
        break;
      case 'View':
        this.navToDetail(event.item.team.id, 'view');
        break;
    }
  }

  saveConfirm() {
    $('#confirm').modal('hide');
    this.deleteTeam();
  }

  cancelConfirm() {
    $('#confirm').modal('hide');
    this.objectDeleteEvent = null;
  }

  deleteTeam() {
    this.action.showLoading();
    this.teamService.deleteTeam({ id: this.objectDeleteEvent.item.team.id }).subscribe((result) => {
      this.toastrService.success(Utils.MESSAGE_DELETE_SUCCESS, '', { timeOut: 3500 });
      this.getListTeam();
    }, (err) => {
      this.action.hideLoading();
      this.toastrService.success(err.message, '', { timeOut: 3500 });
    })
  }

  getValueFormAdd(name) {
    return this.formAdd.controls[name].value;
  }

  navToHomeLoginForm() {
    $("#modalLoginForm").modal("show");
  }

  navToDetail(id, view?) {
    const path = view ? 'team/view/' + id : 'team/edit/' + id;
    this.router.navigate([path]);
  }

  handleDownSelect(event, tab) {
    if (tab == 'area') {
      this.formAdd.patchValue({
        area: event.value.area.name,
        area_id: event.value.area.id
      });
    }
    if (tab == 'level') {
      this.formAdd.patchValue({
        level: event.value.level.name,
        level_id: event.value.level.id
      });
    }
    if (tab == 'career') {
      this.formAdd.patchValue({
        career: event.value.career.name,
        career_id: event.value.career.id
      });
    }
  }

  actionForm(tab) {
    this.isShow = tab == 'show' ? false : true;
  }

}
