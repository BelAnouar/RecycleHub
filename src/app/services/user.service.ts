import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { IndexDBService } from './indexdb.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor( private indexDBService: IndexDBService) {
    const storedUser = typeof window !== 'undefined' ? localStorage.getItem('currentUser') : null;
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  setCurrentUser(user: User | null): void {
    this.currentUserSubject.next(user);
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }

  clearCurrentUser(): void {
    this.currentUserSubject.next(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser');
    }
  }

  register(user: User): void {
    this.setCurrentUser(user);
  }

  login(email: string, password: string): boolean {
    const user = this.currentUserValue;
    if (user && user.email === email && user.password === password) {
      this.setCurrentUser(user);
      return true;
    }
    return false;
  }

  updateUserDetails(updatedUser: User): void {
    this.setCurrentUser(updatedUser);
  }
  
  getCurrentUserRole(): string {

    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');

    return user.role || '';

  }
  updateUserProfile(user: Partial<User>): Observable<User | null> {
    const currentUser = this.currentUserValue;
    if (currentUser) {
      const updatedUser = { ...currentUser, ...user };
      this.setCurrentUser(updatedUser);
      this.indexDBService.updateUser(updatedUser);
      return of(updatedUser);
    }
    return of(null);
  }

  deleteUserAccount(): Observable<void> {
    const currentUser = this.currentUserValue;
    if (currentUser) {
      this.clearCurrentUser();
      if (currentUser.id !== undefined) {
        this.indexDBService.deleteUser(currentUser.id);
      }
      return of();
    }
    return of();
  }
}