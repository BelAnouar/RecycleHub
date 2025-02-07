import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import  { AppState } from "../../store"
import * as DashboardSelectors from "../../store/dashboard.selectors"
import * as DashboardActions from "../../store/dashboard.actions"
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrl: './points.component.scss'
})
export class PointsComponent implements OnInit {
  points$: Observable<number>
  conversionRates = [
    { points: 100, value: 50 },
    { points: 200, value: 120 },
    { points: 500, value: 350 },
  ]

  constructor(private store: Store<AppState>) {
    this.points$ = this.store.select(DashboardSelectors.selectUserPoints)
  }

  ngOnInit(): void {
    this.store.dispatch(DashboardActions.loadUserPoints())
  }

  convertPoints(points: number): void {
    this.store.dispatch(DashboardActions.convertPoints({ points }))
  }
}
