import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import { environment as config } from '../../../../environments/environment';
import * as _ from 'lodash';
import { AngularFireDatabase } from 'angularfire2/database';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable()
export class BaseService {

    OBJECT_ERROR = { 'code': 400, 'message': 'Please check your internet connection and try again' };

    constructor(protected http: Http, protected db?: AngularFireDatabase) { }

    private getUrlApi() {
        return config.host;
    }

    protected getData(path: string): Observable<any> {
        let options = this.getHeaders();
        return this.http.get(`${this.getUrlApi()}/${path}`, options)
            .pipe(
                map(res => {
                    return res.json()
                }),
                catchError(err => this.getError(err))
            )
    }

    protected postData(path: string, body?: any, headersPairs?: any): Observable<any> {
        let options = this.getHeaders(headersPairs);
        return this.http.post(`${this.getUrlApi()}/${path}`, body, options)
            .pipe(
                map(res => {
                    return res.json()
                }),
                catchError(err => this.getError(err))
            )
    }


    protected delete(path,headersPairs?: any){
        let options = this.getHeaders(headersPairs);
        return this.http.delete(`${this.getUrlApi()}/${path}`, options)
            .pipe(
                map(res => {
                    return res.json()
                }),
                catchError(err => this.getError(err))
            )
    }

    getError(err) {
        if (!err.json().message) {
            return throwError(this.OBJECT_ERROR)
        }
        return throwError(err.json());
    }

    private getHeaders(headersPairs?: any) {
        const headers = new Headers();
        let token = localStorage.getItem('token');
        // let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MzkxNTcxMzEsImV4cCI6MTU0MTc0OTEzMSwidWlkIjoiLUxPUkRnWVpKZ3ktNXFsd3AyWkMiLCJjbGFpbXMiOnsidXNlciI6eyJjcmVhdGVkX2F0IjoxNTM5MTQ1NjQ4LCJlbWFpbCI6Im5ndXllbmNvbmdiaTE5OTExMEBnbWFpbC5jb20iLCJuYW1lIjoibmd1eWVuMSIsInBhc3N3b3JkIjoidWRjUy9TM2RHaFFwVEpWTU16TC9CUT09Iiwicm9sZSI6MSwic2VudF9tYWlsX2F0IjoxNTM5MTQ1NjQ4LCJzdGF0dXMiOjEsInR5cGUiOjAsImlkIjoiLUxPUkRnWVpKZ3ktNXFsd3AyWkMifX19.RKX5Sj_il3JcFlwie1ZwAf6KkrVfFG1iyLTozZ2VZxw";
        if (token) {
            headers.append('token', token);
        }
        headers.append('Content-Type', 'application/json');
        if (headersPairs) {
            _.forEach(headersPairs, (value, key) => {
                headers.append(key, value);
            })
        }
        return new RequestOptions({ headers });

    }

    // firebase
    create(data, url) {
        return this.db.list(url).push(data)
    }

    update(data, url) {
        return this.db.object(url).update(data);
    }

    remove(url) {
        return this.db.object(url).remove()
    }

    read(url) {
        return this.db.object(url)
    }
}
