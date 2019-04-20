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
        CareerComponent
    ]
})
export class UserModule { }
