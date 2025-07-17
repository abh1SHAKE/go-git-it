import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingComponent } from './landing/landing.component';

export const routes: Routes = [
    {
        path: '',
        component: LandingComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: '*',
        redirectTo: ''
    }
];
