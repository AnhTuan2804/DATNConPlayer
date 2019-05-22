import { Injectable } from '@angular/core';
import { BaseService } from './helpers/base.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { } from 'firebase'
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class LeagueService extends BaseService {

  constructor(public db: AngularFireDatabase, public http: Http) {
    super(http);
  }

  public getAll() {
    return this.db.list('/league').snapshotChanges().pipe(
      map(actions =>
        actions.map(a => ({ id: a.key, ...a.payload.val() }))
      )
    )
  }

  public getListForUser(email) {
    return this.db.list('/league', ref => ref.orderByChild('user/email').equalTo(email)).snapshotChanges().pipe(
      map(actions =>
        actions.map(a => ({ id: a.key, ...a.payload.val() }))
      )
    )
  }

  public getListByStatusNew() {
    return this.db.list('/league', ref => ref.orderByChild('status').equalTo('New')).snapshotChanges().pipe(
      map(actions =>
        actions.map(a => ({ id: a.key, ...a.payload.val() }))
      )
    )
  }

  public getDetail(id) {
    return this.db.object(`/league/${id}`).valueChanges();
  }

  public getMatch(path) {
    return this.db.object(`/league/${path}`).valueChanges();
  }




  public createLeague(data: Object): Observable<any> {
    data = _.omitBy(data, (value, key) => { return _.isUndefined(value) });
    return this
      .postData(`league/create`, data).map(res => {
        return res;
      })
      .catch((err) => {
        return Observable.throw(err);
      })
  }

  public updateLeague(data: Object): Observable<any> {
    data = _.omitBy(data, (value, key) => { return _.isUndefined(value) });
    return this
      .postData(`league/update`, data).map(res => {
        return res;
      })
      .catch((err) => {
        return Observable.throw(err);
      })
  }

  public updateMatch(data: Object): Observable<any> {
    data = _.omitBy(data, (value, key) => { return _.isUndefined(value) });
    return this
      .postData(`league/update-match`, data).map(res => {
        return res;
      })
      .catch((err) => {
        return Observable.throw(err);
      })
  }

  public deleteLeague(data: Object): Observable<any> {
    return this
      .postData(`league/delete`, data).map(res => {
        return res;
      })
      .catch((err) => {
        return Observable.throw(err);
      })
  }
}
