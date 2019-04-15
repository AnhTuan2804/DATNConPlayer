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
  headers = ['Stt', 'Tên đội', 'Hành động'];
  listArea = [];
  listLevel = [];
  listTeam = [];
  showEditForm = false;
  objectAreaEvent;
  objectLevelEvent;
  selectedIndex;
  constructor(private formBuilder: FormBuilder, private areaService: AreaService,
    private levelService: LevelService, private level: Level,
    private teamService: TeamService, private team: Team,
    private toastrService: ToastrService, private action: ComponentActions,
    private area: Area, private router: Router) {
    this.initForm()
    this.getListArea();
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
      'area_id': new FormControl(''),
      'area': new FormControl('', Validators.required),
      'picture': new FormControl('')
    });
  }

  getListTeam() {
    this.action.showLoading();
    if (localStorage.getItem('role') && localStorage.getItem('role') == 'admin') {
      this.teamService.getListForAdmin().subscribe((result) => {
        this.listTeam = this.team.setteam(result, 'admin');
        this.action.hideLoading();
      }, (err) => {
        console.log(err);
        this.action.hideLoading();
      })
    } else {
      this.teamService.getListForUser().subscribe((result) => {
        this.listTeam = this.team.setteam(result, 'normal');
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

  add() {
    const data = {
      name: this.getValueFormAdd('name'),
      age_max: this.getValueFormAdd('age_max'),
      age_min: this.getValueFormAdd('age_min'),
      level_id: this.getValueFormAdd('level_id'),
      area_id: this.getValueFormAdd('area_id'),
      picture: this.getValueFormAdd('picture'),
      description: this.getValueFormAdd('description'),
    }
    this.action.showLoading();
    this.teamService.createTeam({ team: data }).subscribe((result) => {
      this.toastrService.success('Thêm thành công!', '', { timeOut: 3500 });
      this.addFaild = false;
      this.formAdd.reset();
      this.getListTeam();
    }, (err) => {
      this.action.hideLoading();
      this.addFaild = true;
      this.messageError = err.message;
      this.toastrService.warning(this.messageError, '', { timeOut: 3500 });
    })
  }

  handleAction(event) {
    switch (event.action) {
      case 'Delete':
        this.action.showLoading();
        this.teamService.deleteTeam({ id: event.item.teamUser.team.id }).subscribe((result) => {
          this.toastrService.success('Xóa thành công!', '', { timeOut: 3500 });
          this.getListTeam();
        }, (err) => {
          this.action.hideLoading();
          this.toastrService.success(err.message, '', { timeOut: 3500 });
        })
        break;
      case 'Edit':
        this.navToDetail(event.item.teamUser.team.id);
        break;
      case 'View':
        this.navToDetail(event.item.teamUser.team.id, 'view');
        break;
    }
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
      this.objectAreaEvent = event.value;
      this.formAdd.patchValue({
        area: event.value.area.area,
        area_id: event.value.area.id
      });
    } else {
      this.objectLevelEvent = event.value;
      this.formAdd.patchValue({
        level: event.value.level.level,
        level_id: event.value.level.id
      });
    }
  }

}
