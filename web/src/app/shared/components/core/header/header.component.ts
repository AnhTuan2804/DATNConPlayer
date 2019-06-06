import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/classes/user/user';
import { NotifyService } from 'src/app/shared/services/notify.service';
import { UserService } from 'src/app/shared/services/user.service';
import * as _ from 'lodash';
import { TimeService } from 'src/app/shared/services/helpers/time.service';
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
  listNotify = [];
  constructor(private user: User, private router: Router,
    private timeService: TimeService,
    private notifyService: NotifyService, private userService: UserService) {
    this.checkLocalStore();
  }

  ngOnInit() {
  }

  getListNotify() {
    this.userService.getProfile().subscribe((user) => {
      this.notifyService.getListByUserID(user.id).subscribe((notifys) => {
        this.listNotify = this.setListNotify(notifys);
      })
    })
  }

  navi(path) {
    this.router.navigate([path])
  }

  setListNotify(notifys) {
    const tmp = [];
    _.forEach(notifys, (item) => {
      if (item.status == 'New') {
        item.message = item.message.substring(0, 40);
        tmp.push(item);
      }
    })
    return tmp;
  }

  readNotify(id) {
    const data = {
      status: 'Read',
      id: id,
      create_at: this.timeService.getDateWithoutTime(null)
    }
    this.notifyService.updateNotify(data).subscribe((result) => { });
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
    if (localStorage.getItem('token')) {
      this.getListNotify();
    }
  }
}
