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
declare var $: any;

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {

  formDetail: FormGroup;
  editFaild: boolean = false;
  addFaild: boolean = false;
  messageError: string = "";
  headers = ['Stt', 'Tên thành viên', 'Hành động'];
  listArea = [];
  listLevel = [];
  listUser = [];
  showEditForm = false;
  objectAreaEvent;
  objectLevelEvent;
  selectedIndex;
  constructor(private formBuilder: FormBuilder, private areaService: AreaService,
    private levelService: LevelService, private level: Level,
    private teamService: TeamService, private team: Team,
    private toastrService: ToastrService, private action: ComponentActions,
    private area: Area, private router: Router, private route: ActivatedRoute) {
    this.initForm()
    this.getListArea();
    this.getListLevel();
  }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.navToHomeLoginForm();
    }
    this.route.params.subscribe((params) => {
      const id = params.id;
      this.getTeamDetail(id);
    })
  }

  initForm() {
    this.formDetail = this.formBuilder.group({
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

  getTeamDetail(id) {
    this.teamService.getDetail(id).subscribe((result) => {
      // this.listUser = this.team.setteam(result);
      console.log(result)
      this.action.hideLoading();
    }, (err) => {
      console.log(err);
      this.action.hideLoading();
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

  outputContentStatus(event) {
    console.log(event)
    // this.objectAreaEvent = _.find(this.listUser, (item) => {
    //   return item.team.name == event.item.team.name;
    // })
    // this.formDetail.patchValue({
    //   area: event.item.team.name
    // })
    // this.showEditForm = true;
  }

  add() {
    const data = {
      name: this.getValueFormDetail('name'),
      age_max: this.getValueFormDetail('age_max'),
      age_min: this.getValueFormDetail('age_min'),
      level_id: this.getValueFormDetail('level_id'),
      area_id: this.getValueFormDetail('area_id'),
      picture: this.getValueFormDetail('picture'),
      description: this.getValueFormDetail('description'),
    }
    this.action.showLoading();
    this.teamService.createTeam({ team: data }).subscribe((result) => {
      this.toastrService.success('Thêm thành công!', '', { timeOut: 3500 });
      this.addFaild = false;
      this.formDetail.reset();
      // this.getListUser();
    }, (err) => {
      this.action.hideLoading();
      this.addFaild = true;
      this.messageError = err.message;
    })
  }

  handleAction(event) {
    switch (event.action) {
      case 'Delete':
        this.action.showLoading();
        this.teamService.deleteTeam({ id: event.item.teamUser.team.id }).subscribe((result) => {
          this.toastrService.success('Xóa thành công!', '', { timeOut: 3500 });
          // this.getListUser();
        }, (err) => {
          this.action.hideLoading();
          this.toastrService.success(err.message, '', { timeOut: 3500 });
        })
        break;
      case 'Edit':
        // this.rou
        console.log('some thing here')
    }


  }

  getValueFormDetail(name) {
    return this.formDetail.controls[name].value;
  }

  navToHomeLoginForm() {
    $("#modalLoginForm").modal("show");
  }

  handleDownSelect(event, tab) {
    if (tab == 'area') {
      this.objectAreaEvent = event.value;
      this.formDetail.patchValue({
        area: event.value.area.area,
        area_id: event.value.area.id
      });
    } else {
      this.objectLevelEvent = event.value;
      this.formDetail.patchValue({
        level: event.value.level.level,
        level_id: event.value.level.id
      });
    }
  }
}
