import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment as config } from '../../environments/environment';

import { MainLayoutComponent } from '../shared/layout/main-layout/main-layout.component';
import { PrimaryLayoutComponent } from '../shared/layout/primary-layout/primary-layout.component';
import { LoginComponent } from '../common/login/login.component';
import { RegisterComponent } from '../common/register/register.component';

export const routes: Routes = [
   
    {
        path: `${config.routerLoginAdmin}`,
        component: PrimaryLayoutComponent,
        children: [
            { path: '', component: RegisterComponent },
        ]
    },
    {
        path: `${config.routerLoginAdmin}`,
        component: PrimaryLayoutComponent,
        children: [
            { path: 'login', component: LoginComponent },
        ]
    }
];

export const AdminRouting: ModuleWithProviders = RouterModule.forChild(routes);
