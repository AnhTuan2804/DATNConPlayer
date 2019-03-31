import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { environment as config } from '../../../../environments/environment';
import { UserRole } from '../../enums/user-role';
import { UserStatus } from '../../enums/user-status';

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
        // this.setMenuItem();
        // this.getValidRouter();
        this.setStatusLocal(user);
    }

    setStatusLocal(user) {
        localStorage.setItem('token', user.token);
        localStorage.setItem('role', this.role);
    }

    removeLocal() {
        localStorage.setItem('token', '');
        localStorage.setItem('role', '')
    }

    // setMenuItem() {
    //     this.menuItems.validRouter = this.menuItems.items;
    // }

    // public getValidRouter() {
    //     let currentPath = window.location.pathname;
    //     if (_.isEmpty((localStorage.getItem('role')))) {
    //         return;
    //     }
    //     let role = Number(localStorage.getItem('role'));
    //     if (role == UserRole.ADMIN && currentPath.indexOf(config.routerLoginAdmin) == -1) {
    //         this.router.navigate([config.routerLoginAdmin]);
    //     } else if (role == UserRole.NORMAL && currentPath.indexOf(config.routerLoginAdmin) >= 0) {
    //         this.router.navigate(['/']);
    //     }
    //     this.setActiveNav();
    // }

    // public setActiveNav(url?) {
    //     let tmp = [];
    //     _.forEach(this.menuItems.validRouter, (item) => {
    //         let activeItem = false;
    //         _.forEach(item.items, (itemMenu) => {
    //             if (url && url == itemMenu.router) {
    //                 itemMenu['active'] = true;
    //                 activeItem = true;
    //             } else if (!url && window.location.pathname && itemMenu.router && window.location.pathname.indexOf(itemMenu.router) == 0) {
    //                 itemMenu['active'] = true;
    //                 activeItem = true;
    //             } else {
    //                 itemMenu['active'] = false;
    //             }
    //         });
    //         item['active'] = activeItem;
    //         tmp.push(item);
    //     });
    //     this.menuItems.validRouter = tmp;
    // }
}
