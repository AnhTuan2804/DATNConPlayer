import { Component, OnInit, Input } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  // @Input('show') show = true;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes): void {
    // this.showLoading(this.show)
  }
  showLoading(isShow) {
    // setTimeout(() => {
    //   if (isShow) {
    //     $("#loading").modal("show");
    //   } else {
    //     $("#loading").modal("hide");
    //   }
    // }, 500);

  }
}
