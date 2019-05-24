import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import * as _ from 'lodash';
import { LoginService } from 'src/app/shared/services/login.service';
import { User } from 'src/app/shared/classes/user/user';
import { ComponentActions } from 'src/app/shared/classes/utils/component-actions';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-modal-pair-match',
  templateUrl: './modal-pair-match.component.html',
  styleUrls: ['./modal-pair-match.component.scss']
})
export class ModalPairMatchComponent implements OnInit {

  @Input() id = '';
  @Input() listTeam = [];
  @Input() title = '';
  @Input() isRegister = false;
  @Output() outputE = new EventEmitter();
  modalPairForm: FormGroup;
  loginFail: boolean = false;
  messageError: string = "";
  objectTeamEvent;
  constructor(private formBuilder: FormBuilder, private loginService: LoginService,
    private user: User, private componentAction: ComponentActions, private router: Router) { }

  ngOnInit() {
    this.modalPairForm = this.formBuilder.group({
      'team': new FormControl('', Validators.required),
    });
  }

  ngOnChanges(changes): void {
    
  }

  pair() {
    this.outputE.emit(this.objectTeamEvent);
  }

  handleDownSelect(event) {
    this.objectTeamEvent = event.value;
    this.modalPairForm.patchValue({
      'team': event.value.itemName
    })
  }
}
