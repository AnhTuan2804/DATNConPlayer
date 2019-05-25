import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class AuthGuardAdmin implements CanActivate {
    constructor(private router: Router) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | boolean {
        let subject = new Subject<boolean>();
        if (localStorage.getItem('token') === "undefined" && localStorage.getItem('token')) {
            this.router.navigate(['']);
            subject.next(false);
        }
        if (localStorage.getItem('role') != "Admin") {
            this.router.navigate(['error-page']);
            subject.next(false);
        }
        return true;
    }
}
