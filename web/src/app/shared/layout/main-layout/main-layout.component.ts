import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  isShowLogin = false;
  // isShowRegister = false;
  constructor() { }

  ngOnInit() {
  }

  login() {
    this.isShowLogin = true;
    $('#modalLoginForm').modal("show");
  }

  // register(){
  //   this.isShowRegister = true;
  //   $('#modalRegister').show();
  // }

}
