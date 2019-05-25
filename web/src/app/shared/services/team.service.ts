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

  public getListForUser(): Observable<any> {
    return this
      .getData(`team/get-list-for-user`)
      .catch((err) => {
        return Observable.throw(err);
      })
  }

  public getDetail(id): Observable<any> {
    return this
      .getData(`team/detail?id=${id}`)
      .catch((err) => {
        return Observable.throw(err);
      })
  }

  public getListByCaptain(): Observable<any> {
    return this
      .getData(`team/get-list-by-captain`)
      .catch((err) => {
        return Observable.throw(err);
      })
  }

  public getListForAdmin(): Observable<any> {
    return this
      .getData(`team/get-list-for-admin`)
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

  public addMember(data: Object): Observable<any> {
    return this
      .postData(`team/add-member`, data).map(res => {
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

  public deleteMember(data: Object): Observable<any> {
    return this
      .postData(`team/delete-member`, data).map(res => {
        return res;
      })
      .catch((err) => {
        return Observable.throw(err);
      })
  }
}
