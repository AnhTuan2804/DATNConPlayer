import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Injectable()
export class User {
    id: string;
    email: string;
    fullname: string;
    phone: string;
    is_lock: boolean;
    is_delete: boolean;
    role: string;

    constructor(private router: Router) { }

    setEmail(email) {
        this.email = email;
    }

    setUser(user) {
        this.id = user.id;
        this.email = user.email;
        this.fullname = user.fullname;
        this.phone = user.phone;
        this.role = user.role;
        this.is_delete = user.is_delete == 1 ? true : false;
        this.is_lock = user.is_lock == 1 ? true : false;
        this.setLocal(user);
    }

    setLocal(user) {
        localStorage.setItem('token', user.token);
    }

    removeLocal() {
        localStorage.setItem('token', '');
    }
}
