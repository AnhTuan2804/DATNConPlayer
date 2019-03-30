import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from '../shared/guards/auth.guard';
import { MainLayoutComponent } from '../shared/layout/main-layout/main-layout.component';
import { LoginComponent } from '../common/login/login.component';
import { RegisterComponent } from '../common/register/register.component';

export const routes : Routes = [
    {
        path: ``,
        component: MainLayoutComponent,
        children: [
            { path: '', component: RegisterComponent},
        ]
    },
];

export const UserRouting: ModuleWithProviders = RouterModule.forChild(routes);