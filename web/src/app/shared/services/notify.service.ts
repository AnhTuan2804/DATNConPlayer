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
export class NotifyService extends BaseService {

  constructor(public db: AngularFireDatabase, public http: Http) {
    super(http);
  }

  public getList() {
    return this.db.list('/notify').snapshotChanges().pipe(
      map(actions =>
        actions.map(a => ({ id: a.key, ...a.payload.val() }))
      )
    )
  }

  public getListByUserID(userID) {
    return this.db.list('/notify', ref => ref.orderByChild('user_id').equalTo(userID)).snapshotChanges().pipe(
      map(actions =>
        actions.map(a => ({ id: a.key, ...a.payload.val() }))
      )
    )
  }

  public createNotify(data: Object): Observable<any> {
    data = _.omitBy(data, (value, key) => { return _.isUndefined(value) });
    return this
      .postData(`notify/create`, data).map(res => {
        return res;
      })
      .catch((err) => {
        return Observable.throw(err);
      })
  }

  public updateNotify(data: Object): Observable<any> {
    data = _.omitBy(data, (value, key) => { return _.isUndefined(value) });
    return this
      .postData(`notify/update`, data).map(res => {
        return res;
      })
      .catch((err) => {
        return Observable.throw(err);
      })
  }

}

