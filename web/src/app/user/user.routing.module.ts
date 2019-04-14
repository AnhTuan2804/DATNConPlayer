import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from '../shared/guards/auth.guard';
import { MainLayoutComponent } from '../shared/layout/main-layout/main-layout.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AreaComponent } from './area/area.component';
import { AuthGuardAdmin } from '../shared/guards/auth-admin.guard';
import { TeamComponent } from './team/team.component';
import { LevelComponent } from './level/level.component';
import { TeamDetailComponent } from './team/team-detail/team-detail.component';

export const routes: Routes = [
    {
        path: ``,
        component: MainLayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
            { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
            { path: 'area', component: AreaComponent, canActivate: [AuthGuardAdmin] },
            { path: 'team', component: TeamComponent, canActivate: [AuthGuard] },
            { path: 'team/edit/:id', component: TeamDetailComponent, canActivate: [AuthGuard] },
            { path: 'level', component: LevelComponent, canActivate: [AuthGuardAdmin] },
        ]
    }
];

export const UserRouting: ModuleWithProviders = RouterModule.forChild(routes);