import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './helpers/auth.guard';
import {LogoutComponent} from "./logout/logout.component";
import {EndpointComponent} from "./endpoint/endpoint.component";
import {RulesComponent} from "./rules/rules.component";
import {AutzRulesComponent} from "./autz-rules/autz-rules.component";

const routes: Routes = [
    { path: '', component: EndpointComponent, canActivate: [AuthGuard] },
    { path: 'rules', component: RulesComponent, canActivate: [AuthGuard] },
    { path: 'autz-rules', component: AutzRulesComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload', });
