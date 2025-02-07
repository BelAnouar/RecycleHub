import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { CollectionRequestComponent } from './collection-request/collection-request.component';
import { PointsComponent } from './points/points.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      { path: "", redirectTo: "collection-requests", pathMatch: "full" },
      { path: "collection-requests", component: CollectionListComponent },
      { path: "new-request", component: CollectionRequestComponent },
      { path: "points", component: PointsComponent },
      { path: "profile", component: ProfileComponent },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
