import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
declare var $;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() ouputlogin = new EventEmitter();
  isShow = true;
  constructor(private router: Router) {
    this.checkLocalStore();
  }

  ngOnInit() {
  }

  login() {
    this.ouputlogin.emit()
  }

  logout() {
    localStorage.setItem('token', '');
    window.location.reload();
  }

  checkLocalStore() {
    if (localStorage.getItem('token') === "undefined" || !localStorage.getItem('token')) {
      this.isShow = false;
    }
  }
}
