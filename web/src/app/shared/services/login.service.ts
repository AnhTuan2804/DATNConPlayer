import { Injectable } from '@angular/core';
import { BaseService } from './helpers/base.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import * as base64 from 'base-64'

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {

  constructor(public http: Http) {
    super(http);
  }

  public doLogin(email: string, password: string): Observable<any> {
    let auth = `${email}:${password}`;
    let encode = base64.encode(auth);
    let headers = { 'auth': encode };
    return this
      .postData(`login`, null, headers).map(this.handleAuthResponse.bind(this))
      .catch((err) => {
        return Observable.throw(err);
      })
  }

  private handleAuthResponse(res: Response): string {
    // let object = res.json();;
    let token: string = res['token']
    localStorage.setItem('token', token);
    return token;
  }
}
