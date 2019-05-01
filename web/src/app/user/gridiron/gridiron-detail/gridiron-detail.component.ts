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
import { GridironService } from 'src/app/shared/services/gridiron.service';
import { Gridiron } from 'src/app/shared/classes/gridiron';
import { InfoCommonService } from 'src/app/shared/services/info-common.service';
import { Utils } from 'src/app/shared/enums/utils';
import { InfoCommon } from 'src/app/shared/classes/info-common';
declare var $: any;
@Component({
  selector: 'app-gridiron-detail',
  templateUrl: './gridiron-detail.component.html',
  styleUrls: ['./gridiron-detail.component.scss']
})
export class GridironDetailComponent implements OnInit {

  formDetail: FormGroup;
  formAddSubGri: FormGroup;
  formPriceOnime: FormGroup;
  addSubGriFaild: boolean = false;
  editFaild: boolean = false;
  addPriceOnTimeFaild = false;
  messageError: string = "";
  messageErrAddSubGri: string = "";
  messageErrPriceOntime: "";
  headers = ['No.', 'Name', 'Type of Gridiron', 'Actions'];
  headersPriceOnTime = ['No.', 'Time', 'Type of gridiron', 'Price', 'Actions'];
  listArea = [];
  listUser = [];
  listSize = [];
  listTime = [];
  listSubGridiron = [];
  listPriceOnTime = [];
  showEditForm = false;
  objectAreaEvent;
  objectSizeEvent;
  objectDelSubEvent;
  objectDelPriceEvent;
  selectedIndex;
  view: boolean = false;
  dataDetail;
  countName = true;
  constructor(private formBuilder: FormBuilder, private areaService: AreaService,
    private infoCommonService: InfoCommonService, private infoCommon: InfoCommon,
    private levelService: LevelService, private level: Level,
    private gridironService: GridironService, private gridiron: Gridiron,
    private toastrService: ToastrService, private action: ComponentActions,
    private area: Area, private router: Router, private route: ActivatedRoute) {
    this.initForm()
    this.getListArea();
    this.getListSize();
    this.getListTime();
  }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.navToHomeLoginForm();
    }
    this.route.params.subscribe((params) => {
      const id = params.id;
      this.getDetail(id);
    })
  }

  initForm() {
    this.formDetail = this.formBuilder.group({
      'name': new FormControl('', Validators.required),
      'address': new FormControl('', Validators.required),
      'phone': new FormControl('', Validators.required),
      'link_face': new FormControl(''),
      'area_id': new FormControl(''),
      'description': new FormControl(''),
      'area': new FormControl('', Validators.required),
      'picture': new FormControl('')
    });

    this.formAddSubGri = this.formBuilder.group({
      'quantity': new FormControl('', Validators.required),
      'size_gridiron': new FormControl('', Validators.required),
      'size_gridiron_id': new FormControl(''),
      'name_gridiron': new FormControl('', Validators.required)
    })

    this.formPriceOnime = this.formBuilder.group({
      'price': new FormControl('', Validators.required),
      'size_gridiron': new FormControl('', Validators.required),
      'size_gridiron_id': new FormControl(''),
      'time_id': new FormControl(''),
      'time': new FormControl('', Validators.required),
    })
  }

  getDetail(id) {
    this.action.showLoading();
    this.gridironService.getDetail(id).subscribe((result) => {
      this.dataDetail = result;
      this.bindData(result);
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

  getListSize() {
    this.infoCommonService.getListSize().subscribe((result) => {
      this.listSize = this.infoCommon.getListSizeForDropDown(result);
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

  bindData(data) {
    this.bindSubGridiron(data.sub_gridirons);
    this.bindPriceOnTime(data.price_on_times);
    this.formDetail.patchValue({
      name: data.name,
      address: data.address,
      phone: data.phone,
      description: data.description,
      link_face: data.link_face,
      area_id: data.area.id,
      area: data.area.name,
      picture: data.picture
    })
  }

  bindSubGridiron(subGris) {
    subGris = _.sortBy(subGris, ['size_gridiron_id']);
    const tmp = [];
    let stt = 1;
    _.forEach(subGris, (item) => {
      let data = [];
      data['sub_gridiron'] = item;
      data['content'] = [
        { title: stt },
        { title: item.name },
        { title: item.size_gridiron.name }
      ];
      stt++;
      data['actions'] = ['Delete'];
      tmp.push(data);
    })
    this.listSubGridiron = tmp;
  }

  bindPriceOnTime(priceOnTimes) {
    priceOnTimes = _.sortBy(priceOnTimes, ['size_gridiron_id']);
    const tmp = [];
    let stt = 1;
    _.forEach(priceOnTimes, (item) => {
      let data = [];
      data['price_on_time'] = item;
      data['content'] = [
        { title: stt },
        { title: item.time.time_start + ' : ' + item.time.time_end },
        { title: item.size_gridiron.name },
        { title: item.price }
      ];
      stt++;
      data['actions'] = ['Delete'];
      tmp.push(data);
    })
    this.listPriceOnTime = tmp;
  }

  edit() {
    const data = {
      name: this.getValueFormDetail('name'),
      address: this.getValueFormDetail('address'),
      phone: this.getValueFormDetail('phone'),
      link_face: this.getValueFormDetail('link_face'),
      area_id: this.getValueFormDetail('area_id'),
      picture: this.getValueFormDetail('picture'),
      description: this.getValueFormDetail('description'),
      id: this.dataDetail.id
    }
    this.action.showLoading();
    this.gridironService.updateGridiron(data).subscribe((result) => {
      this.toastrService.success(Utils.MESSAGE_UPDATE_SUCCESS, '', { timeOut: 3500 });
      this.editFaild = false;
      this.action.hideLoading();
    }, (err) => {
      this.action.hideLoading();
      this.editFaild = true;
      this.messageError = err.message;
      this.toastrService.error(this.messageError, '', { timeOut: 3500 });
    })
  }

  addSubGri() {
    const data = [];
    this.countName = true;
    let splitName = (this.getValueFromFormSubGri('name_gridiron')).split(',');
    let count = 0;
    for (const item of splitName) {
      if (item != '') {
        const sub_gri = {
          name: item,
          size_gridiron_id: this.getValueFromFormSubGri('size_gridiron_id'),
          gridiron_id: this.dataDetail.id
        }
        data.push(sub_gri);
        count++;
      }
    }
    if (splitName.length != count || count != this.formAddSubGri.controls['quantity'].value) {
      this.countName = false;
      return;
    }

    this.action.showLoading();
    this.gridironService.createSubGridiron({ sub_gridirons: data }).subscribe((result) => {
      this.action.hideLoading();
      this.addSubGriFaild = false;
      this.formAddSubGri.reset();
      this.toastrService.success(Utils.MESSAGE_CREATE_SUCCESS, '', { timeOut: 3000 });
      this.getDetail(this.dataDetail.id);
    }, (err) => {
      this.action.hideLoading();
      this.addSubGriFaild = true;
      this.messageErrAddSubGri = err.message;
      this.toastrService.error(this.messageErrAddSubGri, '', { timeOut: 3000 });
    })
  }

  addPriceOnTime() {
    const data = {
      price: this.getValueFromFormPriceOonTime('price'),
      time_id: this.getValueFromFormPriceOonTime('time_id'),
      size_gridiron_id: this.getValueFromFormPriceOonTime('size_gridiron_id'),
      gridiron_id: this.dataDetail.id
    }
    this.action.showLoading();
    this.gridironService.createPriceOnTime({ price_on_time: data }).subscribe((result) => {
      // this.action.hideLoading();
      this.addPriceOnTimeFaild = false;
      this.toastrService.success(Utils.MESSAGE_CREATE_SUCCESS, '', { timeOut: 3000 });
      this.getDetail(this.dataDetail.id)
    }, (err) => {
      this.action.hideLoading();
      this.addPriceOnTimeFaild = true;
      this.messageErrPriceOntime = err.message;
      this.toastrService.error(this.messageErrPriceOntime, '', { timeOut: 3000 });
    })
  }

  getValueFormDetail(name) {
    return this.formDetail.controls[name].value;
  }

  getValueFromFormSubGri(name) {
    return this.formAddSubGri.controls[name].value;
  }

  getValueFromFormPriceOonTime(name) {
    return this.formPriceOnime.controls[name].value;
  }

  navToHomeLoginForm() {
    $("#modalLoginForm").modal("show");
  }

  handleDownSelect(event, tab) {
    if (tab == 'area') {
      this.objectAreaEvent = event.value;
      this.formDetail.patchValue({
        area: event.value.area.name,
        area_id: event.value.area.id
      });
    }
    if (tab == 'size_gridiron') {
      this.objectSizeEvent = event.value;
      this.formAddSubGri.patchValue({
        size_gridiron: event.value.size.name,
        size_gridiron_id: event.value.size.id
      });
    }
  }

  handleDownSelectForPriceOntime(event, tab) {
    if (tab == 'time') {
      this.formPriceOnime.patchValue({
        time: event.value.time.time_start + ' : ' + event.value.time.time_end,
        time_id: event.value.time.id
      });
    }
    if (tab == 'size_gridiron') {
      this.formPriceOnime.patchValue({
        size_gridiron: event.value.size.name,
        size_gridiron_id: event.value.size.id
      });
    }
  }

  handleAction(event) {
    this.objectDelSubEvent = event;
    $('#sub').modal('show');
  }

  delSub(){
    this.action.showLoading();
    this.gridironService.deleteSubGridiron({ id: this.objectDelSubEvent.item.sub_gridiron.id }).subscribe((result) => {
      this.toastrService.success(Utils.MESSAGE_DELETE_SUCCESS, '', { timeOut: 3500 });
      this.getDetail(this.dataDetail.id);
    }, (err) => {
      this.action.hideLoading();
      this.toastrService.error(err.message, '', { timeOut: 3500 });
    })
  }

  handleActionPricOnTime(event) {
    this.objectDelPriceEvent = event;
    $('#price').modal('show');
  }

  delPrice(){
    this.action.showLoading();
    this.gridironService.deletePriceOnTime({ id: this.objectDelPriceEvent.item.price_on_time.id }).subscribe((result) => {
      this.toastrService.success(Utils.MESSAGE_DELETE_SUCCESS, '', { timeOut: 3500 });
      this.getDetail(this.dataDetail.id);
    }, (err) => {
      this.action.hideLoading();
      this.toastrService.error(err.message, '', { timeOut: 3500 });
    })
  }

  saveConfirm(tab) {
    $(`#${tab}`).modal('hide');
    if(tab == 'sub'){
      this.delSub();
    }
    if(tab == 'price'){
      this.delPrice();
    }
  }

  cancelConfirm(tab) {
    $(`#${tab}`).modal('hide');
    this.objectDelPriceEvent = null;
    this.objectDelSubEvent = null;
  }
}
