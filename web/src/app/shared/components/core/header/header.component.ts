import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/classes/user/user';
declare var $;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() ouputlogin = new EventEmitter();
  isShow = true;
  isAdmin = false;
  constructor(private user: User, private router: Router) {
    this.checkLocalStore();
  }

  ngOnInit() {
  }

  login() {
    this.ouputlogin.emit()
  }

  logout() {
    this.user.removeLocal();
    window.location.reload();
  }

  checkLocalStore() {
    if (localStorage.getItem('token') === "undefined" || !localStorage.getItem('token')) {
      this.isShow = false;
    } else if (localStorage.getItem('role') && localStorage.getItem('role') == 'Admin') {
      this.isAdmin = true
    }
  }
}
