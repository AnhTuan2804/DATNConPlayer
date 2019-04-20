import { Injectable } from '@angular/core';
import { BaseService } from './helpers/base.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InfoCommonService extends BaseService {

  constructor(public http: Http) {
    super(http);
  }

  public getListSize(): Observable<any> {
    return this
      .getData(`size-gridiron/get-list`)
      .catch((err) => {
        return Observable.throw(err);
      })
  }

  public getListTime(): Observable<any> {
    return this
      .getData(`time/get-list`)
      .catch((err) => {
        return Observable.throw(err);
      })
  }

  public getListRole(): Observable<any> {
    return this
      .getData(`role/get-list`)
      .catch((err) => {
        return Observable.throw(err);
      })
  }
}
