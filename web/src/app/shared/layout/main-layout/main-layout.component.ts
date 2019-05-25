import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  login() {
    $('#modalLoginForm').modal("show");
  }

  showRegisterForm() {
    $("#modalLoginForm").modal("hide");
    $('#modalRegisterForm').modal("show");
  }

  showForgotPass() {
    $("#modalLoginForm").modal("hide");
    $('#modalResetPassForm').modal("show");
  }

}
