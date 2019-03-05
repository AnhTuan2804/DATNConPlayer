import { Component } from '@angular/core';
import { BaseRequestOptions } from '@angular/http';
import { BaseService } from './shared/services/helpers/base.service';
import { UploadFileService } from './shared/services/helpers/upload-file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor(){
  
  }
}
