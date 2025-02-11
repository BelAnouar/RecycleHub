import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { AppState } from '../../store';
import { UserService } from '../../services/user.service';
import { logout } from '../../store/auth.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  user$: Observable<User | null>

  constructor(private store: Store<AppState>,private userService: UserService) {
    this.user$ = this.store.select((state) => state.auth.user)
  }

  ngOnInit(): void {
    
  }

  logout(): void {
    this.store.dispatch(logout());
  }
}
