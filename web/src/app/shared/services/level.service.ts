import { Injectable } from '@angular/core';
import { BaseService } from './helpers/base.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LevelService extends BaseService {

  constructor(public http: Http) {
    super(http);
  }

  public getList(): Observable<any> {
    return this
      .getData(`level/get-list`)
      .catch((err) => {
        return Observable.throw(err);
      })
  }

  public createLevel(data: Object): Observable<any> {
    return this
      .postData(`level/create`, data).map(res => {
        return res;
      })
      .catch((err) => {
        return Observable.throw(err);
      })
  }

  public updateLevel(data: Object): Observable<any> {
    return this
      .postData(`level/update`, data).map(res => {
        return res;
      })
      .catch((err) => {
        return Observable.throw(err);
      })
  }

  public deleteLevel(data: Object): Observable<any> {
    return this
      .postData(`level/delete`, data).map(res => {
        return res;
      })
      .catch((err) => {
        return Observable.throw(err);
      })
  }
}
