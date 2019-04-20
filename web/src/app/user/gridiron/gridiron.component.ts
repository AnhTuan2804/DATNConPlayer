import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ComponentActions } from 'src/app/shared/classes/utils/component-actions';
import * as _ from 'lodash';
import { AreaService } from 'src/app/shared/services/area.service';
import { Area } from 'src/app/shared/classes/area';
import { LevelService } from 'src/app/shared/services/level.service';
import { Level } from 'src/app/shared/classes/level';
import { Team } from 'src/app/shared/classes/team';
import { Router } from '@angular/router';
import { GridironService } from 'src/app/shared/services/gridiron.service';
import { Gridiron } from 'src/app/shared/classes/gridiron';
import { Utils } from 'src/app/shared/enums/utils';
declare var $: any;

@Component({
  selector: 'app-gridiron',
  templateUrl: './gridiron.component.html',
  styleUrls: ['./gridiron.component.scss']
})
export class GridironComponent implements OnInit {
  formAdd: FormGroup;
  addFaild: boolean = false;
  messageError: string = "";
  headers = ['No.', 'Name of gridiron', 'Area', 'Actions'];
  listArea = [];
  listGridiron = [];
  showEditForm = false;
  objectAreaEvent;
  objectLevelEvent;
  selectedIndex;
  constructor(private formBuilder: FormBuilder, private areaService: AreaService,
    private levelService: LevelService, private level: Level,
    private gridironService: GridironService, private gridiron: Gridiron,
    private toastrService: ToastrService, private action: ComponentActions,
    private area: Area, private router: Router) {
    this.initForm()
    this.getListArea();
    this.getListGridiron();
  }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.navToHomeLoginForm();
    }
  }

  initForm() {
    this.formAdd = this.formBuilder.group({
      'name': new FormControl('', Validators.required),
      'address': new FormControl('', Validators.required),
      'phone': new FormControl('', Validators.required),
      'link_face': new FormControl(''),
      'area_id': new FormControl(''),
      'description': new FormControl(''),
      'area': new FormControl('', Validators.required),
      'picture': new FormControl('')
    });
  }

  getListGridiron() {
    this.action.showLoading();
    if (localStorage.getItem('role') && localStorage.getItem('role') == 'admin') {
      this.gridironService.getListForAdmin().subscribe((result) => {
        this.listGridiron = this.gridiron.setData(result);
        this.action.hideLoading();
      }, (err) => {
        console.log(err);
        this.action.hideLoading();
      })
    } else {
      this.gridironService.getListForUser().subscribe((result) => {
        this.listGridiron = this.gridiron.setData(result);
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

  add() {
    const data = {
      name: this.getValueFormAdd('name'),
      address: this.getValueFormAdd('address'),
      phone: this.getValueFormAdd('phone'),
      link_face: this.getValueFormAdd('link_face'),
      area_id: this.getValueFormAdd('area_id'),
      picture: this.getValueFormAdd('picture'),
      description: this.getValueFormAdd('description'),
    }
    this.action.showLoading();
    this.gridironService.createGridiron({ gridiron: data }).subscribe((result) => {
      this.toastrService.success(Utils.MESSAGE_CREATE_SUCCESS, '', { timeOut: 3500 });
      this.addFaild = false;
      this.formAdd.reset();
      this.getListGridiron();
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
        this.gridironService.deleteGridiron({ id: event.item.gridiron.id }).subscribe((result) => {
          this.toastrService.success(Utils.MESSAGE_DELETE_SUCCESS, '', { timeOut: 3500 });
          this.getListGridiron();
        }, (err) => {
          this.action.hideLoading();
          this.toastrService.success(err.message, '', { timeOut: 3500 });
        })
        break;
      case 'Edit':
        this.navToDetail(event.item.gridiron.id);
        break;
    }
  }

  getValueFormAdd(name) {
    return this.formAdd.controls[name].value;
  }

  navToHomeLoginForm() {
    $("#modalLoginForm").modal("show");
  }

  navToDetail(id) {
    const path = 'gridiron/edit/' + id;
    this.router.navigate([path]);
  }

  handleDownSelect(event, tab) {
    if (tab == 'area') {
      this.objectAreaEvent = event.value;
      this.formAdd.patchValue({
        area: event.value.area.name,
        area_id: event.value.area.id
      });
    }
  }

}
