import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { HousingAuthService } from './housing-auth/housing-auth.service';

import { Response, ResponseStatus } from './housing.model';

@Injectable({
  providedIn: 'root',
})
export class HousingProxyService {
  constructor(private _http: HttpClient, private _housingAuthService: HousingAuthService) {
  }

  request<T>(apiUrl: string, callback: (headers: HttpHeaders, apiUrl: string) => Observable<T>): Observable<T> {
    return this._housingAuthService.token$.pipe(
      switchMap((token: string) => {
        const headers: HttpHeaders = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });

        return callback(headers, apiUrl);
      }),
    );
  }

  get<T>(apiUrl: string): Observable<T> {
    return this.request<T>(apiUrl, (headers, apiUrl) =>
      this._http
        .get(apiUrl, {
          headers,
        })
        .pipe(map((response: Response) => {
          return response.data
        })),
    );
  }

  put(apiUrl: string, body: any): Observable<ResponseStatus> {
    return this.request<ResponseStatus>(apiUrl, (headers: HttpHeaders, apiUrl: string) =>
      this._http.put<ResponseStatus>(apiUrl, body, {
        headers: headers.set('Content-Type', 'application/json'),
      }),
    );
  }

  // post(apiUrl: string, body: any): Observable<Response> {
  //   return this.request<Response>(apiUrl, (headers: HttpHeaders, apiUrl: string) =>
  //     this._http.post<Response>(apiUrl, body, {
  //       headers: headers.set('Content-Type', 'application/json'),
  //     }),
  //   );
  // }

  putInspection<T>(apiUrl: string, body: any): Observable<T> {
    return this.request<T>(apiUrl, (headers: HttpHeaders, apiUrl: string) =>
      this._http.put<T>(apiUrl, body, {
        headers: headers.set('Content-Type', 'application/json'),
      }),
    );
  }

  post<T>(apiUrl: string, body: any): Observable<T> {
    return this.request<T>(apiUrl, (headers: HttpHeaders, apiUrl: string) =>
      this._http.post<T>(apiUrl, body, {
        headers: headers.set('Content-Type', 'application/json'),
      }),
    );
  }

  postAttachment<T>(apiUrl: string, body: any): Observable<T> {
    return this.request<T>(apiUrl, (_headers: HttpHeaders, apiUrl: string) =>
      this._http.post<T>(apiUrl, body),
    );
  }

  postImage<T>(apiUrl: string, body: any): Observable<T> {
    return this.request<T>(apiUrl, (headers: HttpHeaders, apiUrl: string) =>
      this._http.post<T>(apiUrl, body, {
        headers
      }),
    );
  }

  delete(apiUrl: string, body?: any): Observable<Response> {
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
      }
    );
  }
}
