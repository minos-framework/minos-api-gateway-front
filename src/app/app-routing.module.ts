import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './helpers/auth.guard';
import {LogoutComponent} from "./logout/logout.component";
import {EndpointComponent} from "./endpoint/endpoint.component";

const routes: Routes = [
    { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'endpoints', component: EndpointComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
