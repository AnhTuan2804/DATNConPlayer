import { Component, OnInit, Output, EventEmitter } from '@angular/core';
declare var $;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() ouputlogin = new EventEmitter();
  @Output() ouputregister = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  login() {
    this.ouputlogin.emit()
    return false;
  }

  // register() {
  //   this.ouputregister.emit()
  //   return false;
  // } 
}
