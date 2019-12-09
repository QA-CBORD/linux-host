import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { BASE_URL } from '../housing.config';

import { Response } from '../housing.model';
import { User } from './housing-auth.model';

@Injectable({
  providedIn: 'root',
})
export class HousingAuthService {
  private readonly _authUrl: string = 'patronIdentityTemp/auth/token';

  private readonly _patronId: string = 'EC2MSG001';

  private _tokenSource: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  token$: Observable<string> = this._tokenSource.asObservable();

  constructor(private _http: HttpClient) {}

  set token(value: string) {
    this._tokenSource.next(value);
  }

  get token(): string {
    return this._tokenSource.getValue();
  }

  authorize(): Observable<string> {
    if (this.token) {
      return this.token$;
    }

    const apiUrl: string = `${BASE_URL}/${this._authUrl}`;

    return this._http.post<Response>(apiUrl, new User(this._patronId)).pipe(
      map((response: Response) => response.data),
      tap((token: string) => (this.token = token)),
      catchError(() => of(null))
    );
  }
}
