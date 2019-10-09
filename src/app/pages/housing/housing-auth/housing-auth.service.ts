import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { BASE_URL } from '../housing.config';

import { Response } from '../housing.model';
import { User } from './housing-auth.model';

@Injectable({
  providedIn: 'root',
})
export class HousingAuthService {
  constructor(private _http: HttpClient) {}

  private _tokenSource: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  private readonly _authUrl: string = 'patronIdentityTemp/auth/token';

  private readonly _patronId: string = '612345678';

  private readonly _patronSK: number = 8000712;

  token$: Observable<string> = this._tokenSource.asObservable();

  getTokenValue(): string {
    return this._tokenSource.getValue();
  }

  authorize(): Observable<string> {
    if (this.getTokenValue()) {
      return this.token$;
    }

    const apiUrl: string = `${BASE_URL}/${this._authUrl}`;

    return this._http.post<Response>(apiUrl, new User(this._patronId, this._patronSK)).pipe(
      map((response: Response) => response.data),
      catchError(() => of(null))
    );
  }
}
