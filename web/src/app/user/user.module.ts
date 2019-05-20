import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { UserRouting } from './user.routing.module';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AreaComponent } from './area/area.component';
import { TeamComponent } from './team/team.component';
import { LevelComponent } from './level/level.component';
import { TeamDetailComponent } from './team/team-detail/team-detail.component';
import { GridironComponent } from './gridiron/gridiron.component';
import { GridironDetailComponent } from './gridiron/gridiron-detail/gridiron-detail.component';
import { CareerComponent } from './career/career.component';
import { MatchComponent } from './match/match.component';
import { MatchDetailComponent } from './match/match-detail/match-detail.component';
import { ModalPairMatchComponent } from './home/modal-pair-match/modal-pair-match.component';
import { LeagueComponent } from './league/league.component';
import { ManageLeagueComponent } from './league/manage-league/manage-league.component';
import { LeagueDetailComponent } from './league/manage-league/league-detail/league-detail.component';
import { HomeGridironComponent } from './home/home-gridiron/home-gridiron.component';
import { NotifyComponent } from './notify/notify.component';
import { ModalUpdateMatchComponent } from './league/manage-league/league-detail/modal-update-match/modal-update-match.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        UserRouting,
        SharedModule
    ],
    declarations: [
        HomeComponent,
        ProfileComponent,
        AreaComponent,
        TeamComponent,
        LevelComponent,
        TeamDetailComponent,
        GridironComponent,
        GridironDetailComponent,
        CareerComponent,
        MatchComponent,
        MatchDetailComponent,
        ModalPairMatchComponent,
        LeagueComponent,
        ManageLeagueComponent,
        LeagueDetailComponent,
        HomeGridironComponent,
        NotifyComponent,
        ModalUpdateMatchComponent
    ]
})
export class UserModule { }
