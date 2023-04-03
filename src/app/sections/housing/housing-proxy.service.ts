import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Response, ResponseStatus } from './housing.model';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { StateTimeDuration } from 'src/app/app.global';
import { StorageStateService } from '@core/states/storage/storage-state.service';

@Injectable({
  providedIn: 'root',
})
export class HousingProxyService {
  private jwt_key = 'jwt_key';

  constructor(
    private _http: HttpClient,
    private readonly _authFacadeService: AuthFacadeService,
    private readonly storageStateService: StorageStateService
  ) {}

  request<T>(apiUrl: string, callback: (headers: HttpHeaders, apiUrl: string) => Observable<T>): Observable<T> {
    return this.jwtToken$().pipe(
      switchMap((token: string) => {
        const headers: HttpHeaders = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });

        return callback(headers, apiUrl);
      })
    );
  }

  get<T>(apiURL: string): Observable<T> {
    return this.jwtToken$().pipe(
      switchMap(token => {
        const headers = { Authorization: `Bearer ${token}` };
        return this._http.get(apiURL, { headers }).pipe(map((response: Response) => response.data));
      })
    );
  }

  put(apiURL: string, body): Observable<ResponseStatus> {
    return this.request<ResponseStatus>(apiURL, (headers: HttpHeaders, apiUrl: string) =>
      this._http.put<ResponseStatus>(apiUrl, body, {
        headers: headers.set('Content-Type', 'application/json'),
      })
    );
  }

  putInspection<T>(apiUrl: string, body): Observable<T> {
    return this.request<T>(apiUrl, (headers: HttpHeaders, apiUrl: string) =>
      this._http.put<T>(apiUrl, body, {
        headers: headers.set('Content-Type', 'application/json'),
      })
    );
  }

  post<T>(apiURL: string, body): Observable<T> {
    return this.request<T>(apiURL, (headers: HttpHeaders, apiUrl: string) =>
      this._http.post<T>(apiUrl, body, {
        headers: headers.set('Content-Type', 'application/json'),
      })
    );
  }

  postAttachment<T>(apiUrl: string, body): Observable<T> {
    return this.request<T>(apiUrl, (_headers: HttpHeaders, apiUrl: string) => this._http.post<T>(apiUrl, body));
  }

  postImage<T>(apiURL: string, body): Observable<T> {
    return this.request<T>(apiURL, (headers: HttpHeaders, apiUrl: string) =>
      this._http.post<T>(apiUrl, body, {
        headers,
      })
    );
  }

  delete(apiUrl: string, body?): Observable<Response> {
    return this.request<Response>(apiUrl, (headers: HttpHeaders, apiUrl: string) => {
      if (body) {
        return this._http.delete<Response>(apiUrl, {
          params: body,
          headers: headers.set('Content-Type', 'application/json'),
        });
      }

      return this._http.delete<Response>(apiUrl, {
        headers: headers.set('Content-Type', 'application/json'),
      });
    });
  }

  private jwtToken$(): Observable<string> {
    return this.storageStateService.getStateEntityByKey$<string>(this.jwt_key).pipe(
      switchMap(data => {
        if (data && data.lastModified + data.timeToLive >= Date.now()) {
       return of(data.value);
        } else {
          return this.retrieveJwtTokenFromServer$();
        }
      })
    );
  }

  private retrieveJwtTokenFromServer$(): Observable<string> {
    return this._authFacadeService
      .getExternalAuthenticationToken$()
      .pipe(
        tap(jwt => this.storageStateService.updateStateEntity(this.jwt_key, jwt, { ttl: StateTimeDuration.TTL }))
      );
  }
}
