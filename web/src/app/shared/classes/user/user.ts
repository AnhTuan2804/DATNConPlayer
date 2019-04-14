import { Injectable } from '@angular/core';
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

    constructor() { }

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
        localStorage.setItem('role', user.role.role);
    }

    removeLocal() {
        localStorage.setItem('token', '');
        localStorage.setItem('role', '');
    }
}
