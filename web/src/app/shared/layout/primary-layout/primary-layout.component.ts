import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-primary-layout',
  templateUrl: './primary-layout.component.html',
  styleUrls: ['./primary-layout.component.scss']
})
export class PrimaryLayoutComponent implements OnInit {

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
