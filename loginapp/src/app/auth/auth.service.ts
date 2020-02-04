import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from './user';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly url = 'http://localhost:3000/auth';
  private subjecUser$: BehaviorSubject<User> = new BehaviorSubject(null);
  private subjecLoggedIn$: BehaviorSubject<Boolean> = new BehaviorSubject(false);

  constructor(private _http: HttpClient) { }

  register(user: User): Observable<User> {
    return this._http.post<User>(`${this.url}/register`, user);
  }

  login(credentials: { email: String, password: String }): Observable<User> {
    return this._http
      .post<User>(`${this.url}/login`, credentials)
      .pipe(
        tap((u: User) => {
          localStorage.setItem('token', u.token);
          this.subjecLoggedIn$.next(true);
          this.subjecUser$.next(u);
        })
      );
  }

  isAuthenticated(): Observable<Boolean> {
    return this.subjecLoggedIn$.asObservable();
  }

  getUser(): Observable<User> {
    return this.subjecUser$.asObservable();
  }

  logout() {
    localStorage.removeItem('token');
    this.subjecLoggedIn$.next(false);
    this.subjecUser$.next(null);
  }

}
