import { Injectable } from '@angular/core';
import { BaseService } from './helpers/base.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GridironService extends BaseService {

  constructor(public http: Http) {
    super(http);
  }

  public createGridiron(data: Object): Observable<any> {
    return this
      .postData(`gridiron/create`, data).map(res => {
        return res;
      })
      .catch((err) => {
        return Observable.throw(err);
      })
  }

  public createSubGridiron(data: Object): Observable<any> {
    return this
      .postData(`gridiron/create-sub-gridiron`, data).map(res => {
        return res;
      })
      .catch((err) => {
        return Observable.throw(err);
      })
  }

  public createPriceOnTime(data: Object): Observable<any> {
    return this
      .postData(`price-on-time/create`, data).map(res => {
        return res;
      })
      .catch((err) => {
        return Observable.throw(err);
      })
  }

  public getListForUser(): Observable<any> {
    return this
      .getData(`gridiron/get-list-for-user`)
      .catch((err) => {
        return Observable.throw(err);
      })
  }

  public getDetail(id): Observable<any> {
    return this
      .getData(`gridiron/detail?id=${id}`)
      .catch((err) => {
        return Observable.throw(err);
      })
  }

  public getListForAdmin(): Observable<any> {
    return this
      .getData(`gridiron/get-list-for-admin`)
      .catch((err) => {
        return Observable.throw(err);
      })
  }

  public getListPublic(): Observable<any> {
    return this
      .getData(`public/get-list-gridiron`)
      .catch((err) => {
        return Observable.throw(err);
      })
  }

  public updateGridiron(data: Object): Observable<any> {
    return this
      .postData(`gridiron/update`, data).map(res => {
        return res;
      })
      .catch((err) => {
        return Observable.throw(err);
      })
  }

  public deleteGridiron(data: Object): Observable<any> {
    return this
      .postData(`gridiron/delete`, data).map(res => {
        return res;
      })
      .catch((err) => {
        return Observable.throw(err);
      })
  }

  public deleteSubGridiron(data: Object): Observable<any> {
    return this
      .postData(`gridiron/delete-sub`, data).map(res => {
        return res;
      })
      .catch((err) => {
        return Observable.throw(err);
      })
  }

  public deletePriceOnTime(data: Object): Observable<any> {
    return this
      .postData(`price-on-time/delete`, data).map(res => {
        return res;
      })
      .catch((err) => {
        return Observable.throw(err);
      })
  }
}
