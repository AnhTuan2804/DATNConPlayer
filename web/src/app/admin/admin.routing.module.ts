import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment as config } from '../../environments/environment';

import { PrimaryLayoutComponent } from '../shared/layout/primary-layout/primary-layout.component';
import { RegisterComponent } from '../common/register/register.component';
import { ProfileComponent } from '../user/profile/profile.component';
import { TeamComponent } from '../user/team/team.component';
import { AreaComponent } from '../user/area/area.component';
import { AuthGuardAdmin } from '../shared/guards/auth-admin.guard';
import { AuthGuard } from '../shared/guards/auth.guard';
import { LevelComponent } from '../user/level/level.component';

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
            { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
            { path: 'area', component: AreaComponent, canActivate: [AuthGuardAdmin] },
            { path: 'team', component: TeamComponent, canActivate: [AuthGuard] },
            { path: 'level', component: LevelComponent, canActivate: [AuthGuardAdmin] },
        ]
    }
];

export const AdminRouting: ModuleWithProviders = RouterModule.forChild(routes);
