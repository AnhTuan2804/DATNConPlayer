import { Injectable } from '@angular/core';
import { BaseService } from './helpers/base.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TeamService extends BaseService {

  constructor(public http: Http) {
    super(http);
  }

  public getList(): Observable<any> {
    return this
      .getData(`team/get-list`)
      .catch((err) => {
        return Observable.throw(err);
      })
  }

  public createTeam(data: Object): Observable<any> {
    return this
      .postData(`team/create`, data).map(res => {
        return res;
      })
      .catch((err) => {
        return Observable.throw(err);
      })
  }

  public updateTeam(data: Object): Observable<any> {
    return this
      .postData(`team/update`, data).map(res => {
        return res;
      })
      .catch((err) => {
        return Observable.throw(err);
      })
  }

  public deleteTeam(data: Object): Observable<any> {
    return this
      .postData(`team/delete`, data).map(res => {
        return res;
      })
      .catch((err) => {
        return Observable.throw(err);
      })
  }
}
