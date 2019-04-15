import { Injectable } from '@angular/core';
import { BaseService } from './helpers/base.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CareerService extends BaseService {

  constructor(public http: Http) {
    super(http);
  }

  public  getList(): Observable<any> {
    return this
      .getData(`career/get-list`)
      .catch((err) => {
        return Observable.throw(err);
      })
  }

  public createCareer(data: Object): Observable<any> {
    return this
      .postData(`career/create`, data).map(res => {
        return res;
      })
      .catch((err) => {
        return Observable.throw(err);
      })
  }

  public updateCareer(data: Object): Observable<any> {
    return this
      .postData(`career/update`, data).map(res => {
        return res;
      })
      .catch((err) => {
        return Observable.throw(err);
      })
  }

  public deleteCareer(data: Object): Observable<any> {
    return this
      .postData(`career/delete`, data).map(res => {
        return res;
      })
      .catch((err) => {
        return Observable.throw(err);
      })
  }
}
