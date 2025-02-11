import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CollectionRequestComponent } from './collection-request/collection-request.component';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { PointsComponent } from './points/points.component';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CollectorComponent } from './collector/collector.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CollectionRequestComponent,
    CollectionListComponent,
    PointsComponent,
    ProfileComponent,
    CollectorComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,ReactiveFormsModule
  ]
})
export class DashboardModule { }
