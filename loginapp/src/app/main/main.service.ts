import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Person } from './person';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  readonly url = 'http://localhost:3000';

  constructor(
    private _http: HttpClient
  ) { }

  getPeople(): Observable<Person[]> {
    return this._http.get<Person[]>(`${this.url}/people`)
      .pipe(
        tap(p => console.log(p)),
        catchError((e) => {
          console.log(e);
          return throwError(e);
        })
      );
  }

  getProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(`${this.url}/products`)
      .pipe(
        tap(p => console.log(p)),
        catchError((e) => {
          console.log(e);
          return throwError(e);
        })
      );
  }

}
