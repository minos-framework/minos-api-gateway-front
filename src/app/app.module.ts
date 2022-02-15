import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import {CommonModule} from "@angular/common";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LoginComponent} from "./login/login.component";
import {AlertComponent} from "./components/alert/alert.component";
import {appRoutingModule} from "./app-routing.module";
import {ErrorInterceptor} from "./helpers/error.interceptor";
import {JwtInterceptor} from "./helpers/jwt.interceptor";
import { MenuComponent } from './components/menu/menu.component';
import {MenubarModule} from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {SharedModule} from "primeng/api";
import { LogoutComponent } from './logout/logout.component';
import { EndpointComponent } from './endpoint/endpoint.component';
import {TableModule} from 'primeng/table';
import { RulesComponent } from './rules/rules.component';
import { RuleAddComponent } from './rules/rule-add/rule-add.component';
import { RuleEditComponent } from './rules/rule-edit/rule-edit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AutzRulesComponent } from './autz-rules/autz-rules.component';
import { AutzRuleAddComponent } from './autz-rules/autz-rule-add/autz-rule-add.component';
import { AutzRuleEditComponent } from './autz-rules/autz-rule-edit/autz-rule-edit.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    appRoutingModule,
    CommonModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    SharedModule,
    TableModule,
    NgbModule,
  ],
    declarations: [
        AppComponent,
        DashboardComponent,
        LoginComponent,
        AlertComponent,
        MenuComponent,
        LogoutComponent,
        EndpointComponent,
        RulesComponent,
        RuleAddComponent,
        RuleEditComponent,
        AutzRulesComponent,
        AutzRuleAddComponent,
        AutzRuleEditComponent,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };
