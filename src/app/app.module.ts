import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { BonusAppComponent } from './bonus-app.component';
import { NavBarComponent } from './nav/navbar.component';
import { BonusComponent } from './bonus/bonus.component';
import { StartsidaComponent } from './startsida/startsida.component';
import { Error404Component } from './errors/404.component';
import { KonsultDashboardComponent } from './konsult-dashboard/konsult-dashboard.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddNewDialogComponent } from './shared/add-new-dialog/add-new-dialog.component';

@NgModule({
    declarations: [
        BonusAppComponent,
        NavBarComponent,
        BonusComponent,
        StartsidaComponent,
        Error404Component,
        KonsultDashboardComponent,
        AddNewDialogComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
    ],
    providers:[],
    bootstrap: [BonusAppComponent]
})
export class AppModule { }


