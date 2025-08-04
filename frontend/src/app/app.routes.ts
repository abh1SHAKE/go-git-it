import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingComponent } from './landing/landing.component';
import { AuthGuard } from './core/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: LandingComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
