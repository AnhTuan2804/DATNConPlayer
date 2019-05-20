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
declare var $: any;

@Component({
  selector: 'app-modal-update-match',
  templateUrl: './modal-update-match.component.html',
  styleUrls: ['./modal-update-match.component.scss']
})
export class ModalUpdateMatchComponent implements OnInit {
  @Input() id = '';
  @Input() match = {};
  @Output() outputData = new EventEmitter();
  updateForm: FormGroup;
  listTime = [];
  listGridiron = [];
  objectTimeEvent;
  objectGridironEvent;
  startDate;
  constructor(private formBuilder: FormBuilder, private action: ComponentActions,
    private gridironService: GridironService, private gridiron: Gridiron,
    private infoCommonService: InfoCommonService, private infoCommon: InfoCommon,
    private user: User, private componentAction: ComponentActions,
    private timeService: TimeService,
    private router: Router) { }

  ngOnInit() {
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
    this.bindData();
  }

  bindData() {
    if (this.match) {
      this.updateForm.patchValue({
        time: this.match['time'] ? this.match['time'].itemName : '',
        description: this.match['description'] || '',
        gridiron: this.match['gridiron'] ? this.match['gridiron']['name'] : '',
        team1_score: this.match['team1_score'] || '',
        team2_score: this.match['team2_score'] || '',
        date_of_match: this.timeService.formatDateFromTimeUnix(this.match['date_of_match'], 'YYYY-MM-DD'),
      })
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
      this.objectTimeEvent = event.value;
      this.updateForm.patchValue({
        time: event.value.time.time_start + ' : ' + event.value.time.time_end,
        time_id: event.value.time.id
      });
    }
  }

  updateInfo() {
    const data = {
      team1_score: this.getValueFromForm('team1_score') || 0,
      team2_score: this.getValueFromForm('team2_score') || 0,
      description: this.getValueFromForm('description')
    }
    if (this.objectGridironEvent) {
      data['gridiron'] = this.objectGridironEvent.name
    }
    if (this.objectTimeEvent) {
      data['time'] = this.objectTimeEvent
    }
    if (this.getValueFromForm('date_of_match')) {
      data['date_of_match'] = this.getValueFromForm('date_of_match')
    }
    this.emitData(data);
  }

  getValueFromForm(name) {
    return this.updateForm.controls[name].value;
  }

  emitData(data) {
    this.outputData.emit(data);
  }

}
