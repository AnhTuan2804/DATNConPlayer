import { Injectable } from '@angular/core';
import { BaseService } from './helpers/base.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { } from 'firebase'

@Injectable({
  providedIn: 'root'
})
export class MatchService extends BaseService {

  constructor(public http: Http) {
    super(http);
  }

  public getListForUser(): Observable<any> {
    return this
      .getData(`match/get-list-for-user`)
      .catch((err) => {
        return Observable.throw(err);
      })
  }

  public createMatch(data: Object): Observable<any> {
    data = _.omitBy(data, (value, key) => { return _.isUndefined(value) });
    return this
      .postData(`match/create`, data).map(res => {
        return res;
      })
      .catch((err) => {
        return Observable.throw(err);
      })
  }

  public getDetail(id): Observable<any> {
    return this
      .getData(`match/detail?id=${id}`)
      .catch((err) => {
        return Observable.throw(err);
      })
  }

  public updateMatch(data: Object): Observable<any> {
    data = _.omitBy(data, (value, key) => { return _.isUndefined(value) });
    return this
      .postData(`match/update`, data).map(res => {
        return res;
      })
      .catch((err) => {
        return Observable.throw(err);
      })
  }

  public deleteMatch(data: Object): Observable<any> {
    return this
      .postData(`match/delete`, data).map(res => {
        return res;
      })
      .catch((err) => {
        return Observable.throw(err);
      })
  }
}
