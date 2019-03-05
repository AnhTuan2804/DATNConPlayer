import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { AdminRouting } from './admin.routing.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        AdminRouting
    ],
    declarations: [

    ]
})
export class AdminModule { }
