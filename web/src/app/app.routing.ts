import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { routes as adminRouter } from './admin/admin.routing.module';
import { routes as userRouter } from './user/user.routing.module';
import { PageErrorComponent } from "./page-error/page-error.component";

export const APP_ROUTES: Routes = [
    {
        path: 'admin',
        children: [
            ...adminRouter
        ]
    },
    {
        path: 'user',
        children: [
            ...userRouter
        ]
    },
    { 
        path: '**', 
        component: PageErrorComponent,
    }
]
export const Routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
