import { Injectable } from '@angular/core';
import { BaseService } from './helpers/base.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AreaService extends BaseService {

  constructor(public http: Http) {
    super(http);
  }

  public getList(): Observable<any> {
    return this
      .getData(`area/get-list`)
      .catch((err) => {
        return Observable.throw(err);
      })
  }

  public createArea(data: Object): Observable<any> {
    return this
      .postData(`area/create`, data).map(res => {
        return res;
      })
      .catch((err) => {
        return Observable.throw(err);
      })
  }

  public updateArea(data: Object): Observable<any> {
    return this
      .postData(`area/update`, data).map(res => {
        return res;
      })
      .catch((err) => {
        return Observable.throw(err);
      })
  }

  public deleteArea(data: Object): Observable<any> {
    return this
      .postData(`area/delete`, data).map(res => {
        return res;
      })
      .catch((err) => {
        return Observable.throw(err);
      })
  }
}
