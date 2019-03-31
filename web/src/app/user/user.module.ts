import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { UserRouting } from './user.routing.module';
import { HomeComponent } from './home/home.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        UserRouting,
        SharedModule
    ],
    declarations: [
        HomeComponent
    ]
})
export class UserModule { }
