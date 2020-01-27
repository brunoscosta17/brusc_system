import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly url = 'http://localhost:3000/auth';

  constructor(private _http: HttpClient) { }

  register(user: User): Observable<User> {
    return this._http.post<User>(`${this.url}/register`, user);
  }

  login(credentials: { email: String, password: String }): Observable<User> {
    return this._http.post<User>(`${this.url}/login`, credentials);
  }

}
