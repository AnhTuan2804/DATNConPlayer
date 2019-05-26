import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/classes/user/user';
import { TimeService } from 'src/app/shared/services/helpers/time.service';
import * as _ from 'lodash';
import { LevelService } from 'src/app/shared/services/level.service';
import { Level } from 'src/app/shared/classes/level';
import { NotifyService } from 'src/app/shared/services/notify.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Title } from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss']
})
export class NotifyComponent implements OnInit {
  listNotifys;
  constructor(public user: User, private userService: UserService,
    private titleService: Title,
    private timeService: TimeService, private notifyService: NotifyService) {
  }

  ngOnInit() {
    this.titleService.setTitle('Notification page');
    this.getListNotify();
  }

  getListNotify() {
    this.userService.getProfile().subscribe((user) => {
      this.notifyService.getListByUserID(user.id).subscribe((result) => {
        this.listNotifys = this.setListNotify(result);
      }, (err) => {
        console.log(err)
      })
    })
  }

  setListNotify(notifys) {
    const tmp = [];
    _.forEach(notifys, (item) => {
      item.create_at = this.timeService.formatDateFromTimeUnix(item.create_at, this.timeService.DATE_FORMAT);
      tmp.push(item)
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

}
