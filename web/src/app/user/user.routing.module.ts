import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from '../shared/guards/auth.guard';
import { MainLayoutComponent } from '../shared/layout/main-layout/main-layout.component';
import { LoginComponent } from '../common/login/login.component';
import { RegisterComponent } from '../common/register/register.component';
import { PrimaryLayoutComponent } from '../shared/layout/primary-layout/primary-layout.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: ``,
        component: MainLayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }
        ]
    }
];

export const UserRouting: ModuleWithProviders = RouterModule.forChild(routes);