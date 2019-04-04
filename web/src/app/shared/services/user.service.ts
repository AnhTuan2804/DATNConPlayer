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

  public getProfile(token: string): Observable<any> {
    let headers = { 'token': token };
    return this
      .postData(`user/profile`, null, headers).map((res) => {
        return res;
      })
      .catch((err) => {
        return Observable.throw(err);
      })
  }

}
