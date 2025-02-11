import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {IndexDBService} from "./services/indexdb.service";
import {environment} from "../environments/environment";
import {metaReducers, reducers} from "./store";
import {AuthEffects} from "./store/auth.effects";
import {DashboardModule} from "./dashboard/dashboard.module";
import {AuthModule} from "./auth/auth.module";
import {HttpClientModule} from "@angular/common/http";
import { DashboardEffects } from './store/dashboard.effects';
import { PointsEffects } from './store/points.effects';
import { CollectionEffects } from './store/collection.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    DashboardModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([AuthEffects,DashboardEffects,PointsEffects,CollectionEffects]),

    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [IndexDBService],
  bootstrap: [AppComponent]
})
export class AppModule { }
