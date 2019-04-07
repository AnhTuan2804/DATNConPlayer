import { Injectable } from '@angular/core';
import { BaseService } from './helpers/base.service';
import { Http } from '@angular/http';
import { base64 } from 'base-64';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  
  constructor(public http: Http) {
    super(http);
  }

  public getProfile(): Observable<any> {
    return this
      .getData(`user/profile`)
      .catch((err) => {
        return Observable.throw(err);
      })
  }

  public updateProfile(data: Object): Observable<any> {
    return this
      .postData(`user/update-profile`, data).map(res => {
        return res;
      })
      .catch((err) => {
        return Observable.throw(err);
      })
  }

  public changePass(data: Object): Observable<any> {
    return this
      .postData(`user/change-password`, data).map(res => {
        return res;
      })
      .catch((err) => {
        return Observable.throw(err);
      })
  }

}