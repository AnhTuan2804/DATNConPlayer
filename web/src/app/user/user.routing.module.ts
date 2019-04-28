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
import { GridironComponent } from './gridiron/gridiron.component';
import { GridironDetailComponent } from './gridiron/gridiron-detail/gridiron-detail.component';
import { CareerComponent } from './career/career.component';
import { MatchComponent } from './match/match.component';
import { MatchDetailComponent } from './match/match-detail/match-detail.component';

export const routes: Routes = [
    {
        path: ``,
        component: MainLayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
            { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
            { path: 'area', component: AreaComponent, canActivate: [AuthGuardAdmin] },
            { path: 'career', component: CareerComponent, canActivate: [AuthGuardAdmin] },
            { path: 'team', component: TeamComponent, canActivate: [AuthGuard] },
            { path: 'team/:item/:id', component: TeamDetailComponent, canActivate: [AuthGuard] },
            { path: 'match', component: MatchComponent, canActivate: [AuthGuard] },
            { path: 'match/:item/:id', component: MatchDetailComponent, canActivate: [AuthGuard] },
            { path: 'level', component: LevelComponent, canActivate: [AuthGuardAdmin] },
            { path: 'gridiron', component: GridironComponent, canActivate: [AuthGuard] },
            { path: 'gridiron/:item/:id', component: GridironDetailComponent, canActivate: [AuthGuard] },
        ]
    }
];

export const UserRouting: ModuleWithProviders = RouterModule.forChild(routes);