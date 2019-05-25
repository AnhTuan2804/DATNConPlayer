import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import * as _ from 'lodash';
import { LoginService } from 'src/app/shared/services/login.service';
import { User } from 'src/app/shared/classes/user/user';
import { ComponentActions } from 'src/app/shared/classes/utils/component-actions';
import { Router } from '@angular/router';
import { GridironService } from 'src/app/shared/services/gridiron.service';
import { Gridiron } from 'src/app/shared/classes/gridiron';
import { InfoCommonService } from 'src/app/shared/services/info-common.service';
import { InfoCommon } from 'src/app/shared/classes/info-common';
import { TimeService } from 'src/app/shared/services/helpers/time.service';
import { LeagueService } from 'src/app/shared/services/league.service';
import { ToastrService } from 'ngx-toastr';
import { Utils } from 'src/app/shared/enums/utils';
import { Title } from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-modal-update-match',
  templateUrl: './modal-update-match.component.html',
  styleUrls: ['./modal-update-match.component.scss']
})
export class ModalUpdateMatchComponent implements OnInit {
  @Input() id = '';
  @Input() isRegistering = false;
  @Input() match = {};
  @Output() outputData = new EventEmitter();
  updateForm: FormGroup;
  listTime = [];
  listGridiron = [];
  objectTimeEvent;
  objectGridironEvent;
  startDate;
  is_update_infor = true;
  is_updated_sroce = 0;
  message = null;
  dataMatchDetail;
  messageErr;
  constructor(private formBuilder: FormBuilder, private action: ComponentActions,
    private gridironService: GridironService, private gridiron: Gridiron,
    private infoCommonService: InfoCommonService, private infoCommon: InfoCommon,
    private titleService: Title,
    private toastrService: ToastrService,
    private timeService: TimeService,
    private leagueService: LeagueService) { }

  ngOnInit() {
    // this.titleService.setTitle('Update Match');
    this.startDate = this.timeService.getDateWithoutTime(new Date());
    this.updateForm = this.formBuilder.group({
      'team1_score': new FormControl(''),
      'team2_score': new FormControl(''),
      'time': new FormControl(''),
      'time_id': new FormControl(''),
      'gridiron': new FormControl(''),
      'gridiron_id': new FormControl(''),
      'description': new FormControl(''),
      'date_of_match': new FormControl('')
    });
  }

  ngOnChanges(changes): void {
    this.getListTime();
    this.getListGridiron();
    this.message = '';
    this.messageErr = '';
    if (this.match) {
      this.action.showLoading();
      const path = `${this.match['league_id']}/rounds/${this.match['current_round']}/${this.match['current_match']}`;
      this.leagueService.getMatch(path).subscribe((result) => {
        console.log(result);
        this.dataMatchDetail = result;
        this.action.hideLoading();
        this.bindData();
      }, err => {
        this.action.hideLoading();
      })
    }
  }

  bindData() {
    this.updateForm.patchValue({
      time: this.dataMatchDetail['time'] ? this.dataMatchDetail['time'].itemName : '',
      gridiron: this.dataMatchDetail['gridiron'] ? this.dataMatchDetail['gridiron'] : '',
      team1_score: this.dataMatchDetail['team1_score'] || '',
      team2_score: this.dataMatchDetail['team2_score'] || '',
      description: this.dataMatchDetail['description'] || '',
      date_of_match: this.dataMatchDetail['date_of_match'] ? this.timeService.formatDateFromTimeUnix(this.dataMatchDetail['date_of_match'], 'YYYY-MM-DD') : '',
    })
    if (this.dataMatchDetail['time'] && this.dataMatchDetail['date_of_match'] && this.dataMatchDetail['gridiron']) {
      if ((this.timeService.getTimeUnixFromTimeFormatYMD(this.timeService.getDateWithoutTime(null)) == this.dataMatchDetail['date_of_match'] &&
        Number(this.dataMatchDetail['time'].time_end) > (new Date()).getHours()) ||
        this.timeService.getTimeUnixFromTimeFormatYMD(this.timeService.getDateWithoutTime(null)) < this.dataMatchDetail['date_of_match']) {
        this.message = 'Match not yet start';
        this.is_update_infor = true;
      } else {
        this.is_update_infor = false;
      }
    } else {
      this.is_update_infor = true;
      this.message = 'Time, Gridiron, Date is required'
    }
  }

  getListGridiron() {
    this.gridironService.getListPublic().subscribe((result) => {
      this.listGridiron = this.gridiron.getListForDropdown(result);
    }, (err) => {
      console.log(err)
    })
  }

  getListTime() {
    this.infoCommonService.getListTime().subscribe((result) => {
      this.listTime = this.infoCommon.getListTimeForDropDown(result);
    }, (err) => {
      console.log(err)
    })
  }

  handleDownSelect(event, tab) {
    if (tab == 'gridiron') {
      this.objectGridironEvent = event.value.gridiron;
      this.updateForm.patchValue({
        gridiron: event.value.gridiron.name,
        gridiron_id: event.value.gridiron.id
      });
    }
    if (tab == 'time') {
      this.objectTimeEvent = event.value.time;
      this.objectTimeEvent['itemName'] = event.value.itemName;
      this.updateForm.patchValue({
        time: event.value.itemName,
        time_id: event.value.time.id
      });
    }
  }

  updateInfo() {
    let data = {};
    if (this.is_update_infor) {
      if (this.objectGridironEvent) {
        data['gridiron'] = this.objectGridironEvent.name
      }
      if (this.objectTimeEvent) {
        data['time'] = this.objectTimeEvent
      }
      if (this.getValueFromForm('date_of_match')) {
        data['date_of_match'] = this.getValueFromForm('date_of_match')
      }
    } else {
      if (!this.dataMatchDetail.is_updated_sroce) {
        data['description'] = this.getValueFromForm('description');
        if (this.getValueFromForm('team1_score') === 0 && this.getValueFromForm('team2_score') === 0) {
          //okoe. get data t update
          this.messageErr = '';
          data['team1_score'] = this.getValueFromForm('team1_score');
          data['team2_score'] = this.getValueFromForm('team2_score');
        } else if (this.getValueFromForm('team1_score') === 0) {
          if (!this.getValueFromForm('team2_score')) {
            this.messageErr = 'Both of score is required!';
            return;
          } else {
            //oke. get data to update
            this.messageErr = '';
            data['team1_score'] = this.getValueFromForm('team1_score');
            data['team2_score'] = this.getValueFromForm('team2_score');
          }
        } else if (this.getValueFromForm('team2_score') === 0) {
          if (!this.getValueFromForm('team1_score')) {
            this.messageErr = 'Both of score is required!';
            return;
          } else {
            //oke. get data to update
            this.messageErr = '';
            data['team1_score'] = this.getValueFromForm('team1_score');
            data['team2_score'] = this.getValueFromForm('team2_score');
          }
        } else if (!this.getValueFromForm('team1_score') || !this.getValueFromForm('team2_score')) {
          this.messageErr = 'Both of score is required!';
          return;
        } else {
          this.messageErr = '';
          data['team1_score'] = this.getValueFromForm('team1_score');
          data['team2_score'] = this.getValueFromForm('team2_score');
        }
      } else {
        data['description'] = this.getValueFromForm('description');
      }
    }
    this.updateMatch(data);
  }

  getValueFromForm(name) {
    return this.updateForm.controls[name].value;
  }

  updateMatch(match) {
    match['id'] = this.match['league_id'];
    match['current_round'] = this.match['current_round'];
    match['current_match'] = this.match['current_match'];
    match['team1'] = this.dataMatchDetail.team1;
    match['team2'] = this.dataMatchDetail.team2;
    this.action.showLoading();
    this.leagueService.updateMatch(match).subscribe((result) => {
      this.action.hideLoading();
      this.toastrService.success(Utils.MESSAGE_UPDATE_SUCCESS, '', { timeOut: 3000 });
    }, err => {
      this.action.hideLoading();
      this.toastrService.warning(err.message, '', { timeOut: 3000 });
    })
  }

}
