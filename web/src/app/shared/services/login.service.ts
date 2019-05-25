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
      .postData(`login`, null, headers).map((res) => {
        return res;
      })
      .catch((err) => {
        return Observable.throw(err);
      })
  }

  public ResetPass(email: string): Observable<any> {
    return this
      .postData(`reset-password`, JSON.stringify({ 'email': email }), null).map(res => {
        return res;
      })
      .catch((err) => {
        return Observable.throw(err);
      })
  }

  public Register(email: string, password: string, phone: string, fullname: string): Observable<any> {
    let auth = `${email}:${password}`;
    let encode = base64.encode(auth);
    const data = {
      phone: phone,
      fullname: fullname
    }
    let headers = { 'auth': encode };
    return this
      .postData(`register`, data, headers).map(res => {
        return res;
      })
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
