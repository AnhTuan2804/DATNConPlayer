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
import { LeagueComponent } from './league/league.component';
import { ManageLeagueComponent } from './league/manage-league/manage-league.component';
import { LeagueDetailComponent } from './league/manage-league/league-detail/league-detail.component';
import { HomeGridironComponent } from './home/home-gridiron/home-gridiron.component';
import { NotifyComponent } from './notify/notify.component';

export const routes: Routes = [
    {
        path: ``,
        component: MainLayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'home', component: HomeComponent },
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
            { path: 'home-league', component: LeagueComponent },
            { path: 'home-gridiron', component: HomeGridironComponent },
            { path: 'manage-league', component: ManageLeagueComponent, canActivate: [AuthGuard] },
            { path: 'notify', component: NotifyComponent, canActivate: [AuthGuard] },
            { path: 'league/:item/:id', component: LeagueDetailComponent }
        ]
    }
];

export const UserRouting: ModuleWithProviders = RouterModule.forChild(routes);