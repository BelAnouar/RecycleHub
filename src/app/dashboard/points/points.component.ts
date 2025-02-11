import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import  { AppState } from "../../store"
import * as DashboardSelectors from "../../store/dashboard.selectors"
import * as DashboardActions from "../../store/dashboard.actions"
import { select, Store } from '@ngrx/store';
import { PointsService } from '../../services/points.service';
import * as PointsActions from '../../store/points.actions';
import * as PointsSelectors from '../../store/points.selectors';
import { log } from 'console';
@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrl: './points.component.scss'
})
export class PointsComponent implements OnInit {

  points$!: Observable<number>;

  conversionRates: { points: number, value: number }[] = [

    { points: 100, value: 10 },

    { points: 200, value: 20 },

    { points: 300, value: 30 }

  ];


  constructor(private store: Store<AppState>) {
   
  }

 
  ngOnInit(): void {
    this.store.dispatch(PointsActions.loadPoints());
    this.points$ = this.store.select(PointsSelectors.selectPoints);
  }

  convertPoints(points: number): void {
    console.log(points , "points");
    
    this.points$.subscribe(userPoints => {
      this.store.dispatch(PointsActions.convertPoints({ points, userPoints }));
    });
  }
  
}