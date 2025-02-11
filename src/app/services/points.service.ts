import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DashboardService } from './dashboard.service';

@Injectable({
  providedIn: 'root'
})
export class PointsService {
  constructor(private dashboardService: DashboardService) {}

  getUserPoints(): Observable<number> {
    return this.dashboardService.getUserPoints();
  }

  convertPoints(points: number,userPoints:number): Observable<number> {
    return this.dashboardService.convertPoints(points,userPoints);
  }
  addPoints(points: number): Observable<number> {
    // This is a placeholder implementation. In a real application,
    // you would make an API call to add points to the user's account.
    // For now, we'll just return the points that were added.
    console.log(`Adding ${points} points`);
    return of(points);
  }
}