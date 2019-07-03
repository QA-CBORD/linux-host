import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { subscribeOn, observeOn, timeout } from 'rxjs/operators';
import { async } from 'rxjs/internal/scheduler/async';
import { queue } from 'rxjs/internal/scheduler/queue';

import { Environment } from 'src/app/environment';

export enum RestCallType {
  get,
  post,
  put,
}

export enum HttpResponseType {
  json,
  text,
}

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private TIMEOUT_MS = 45000;

  constructor(private http: HttpClient) {}

  /**
   *  GET call to AWS API Gateway
   *
   * @param url           URL of REST call
   * @param responseType  HTTP response type included in options
   * @param params        Parameters of REST call
   * @param headers       HTTP header information
   */
  get<T>(
    url: string,
    responseType: HttpResponseType = HttpResponseType.json,
    params?: HttpParams,
    headers?: HttpHeaders
  ): Observable<T> {
    const options: Object = this.getOptions(responseType, params, headers);

    return this.http.get(url, options).pipe(
      subscribeOn(async),
      observeOn(queue),
      timeout(this.TIMEOUT_MS)
    ) as Observable<T>;
  }

  /**
   *  PUT call to AWS API Gateway
   *
   * @param url           URL of REST call
   * @param responseType  HTTP response type included in options
   * @param params        Parameters of REST call
   * @param headers       HTTP header information
   */
  put(
    url: string,
    body: any,
    responseType: HttpResponseType = HttpResponseType.json,
    params?: HttpParams,
    headers?: HttpHeaders
  ): Observable<any> {
    const options = this.getOptions(responseType, params, headers);
    return this.http.put(url, body, options).pipe(
      subscribeOn(async),
      observeOn(queue),
      timeout(this.TIMEOUT_MS)
    );
  }

  /**
   *  POST call to AWS API Gateway
   *
   * @param url           URL of REST call
   * @param responseType  Http response type included in options (text / json)
   * @param params        Parameters of REST call
   * @param headers       Http header information
   */
  post(
    url: string,
    body: any,
    responseType: HttpResponseType = HttpResponseType.json,
    params?: HttpParams,
    headers?: HttpHeaders
  ): Observable<any> {
    const options = this.getOptions(responseType, params, headers);
    return this.http.post(url, body, options).pipe(
      subscribeOn(async),
      observeOn(queue),
      timeout(this.TIMEOUT_MS)
    );
  }

  /**
   * Call to REST backend (AWS API Gateway)
   *
   * @param callType      REST call type (post, put, get, etc)
   * @param resourceURL   URL of resource in API
   * @param responseType  Http response type (text / json)
   * @param body          Body of call
   * @param params        Parameters of call
   * @param headers       Http header information
   */
  authenticatedHTTPCall(
    callType: RestCallType,
    resourceURL: string,
    responseType: HttpResponseType = HttpResponseType.json,
    body?: any,
    params?: HttpParams,
    headers?: HttpHeaders
  ): Observable<any> {
    const finalURL = Environment.getSecureMessagingAPIURL().concat(resourceURL);

    return Observable.create((observer: any) => {
      // sort by call type
      switch (callType) {
        case RestCallType.get:
          this.get<any>(finalURL, responseType, params, headers).subscribe(
            response => {
              observer.next(response);
            },
            (error: any) => {
              if (error.status === 401) {
                /// AUTHENTICATION ERROR, HANDLE WHEN WE KNOW HOW
                this.handleAuthenticationError(error);
              } else {
                observer.error(error);
              }
            }
          );
          break;
        case RestCallType.post:
          this.post(finalURL, body, responseType, params, headers).subscribe(
            response => {
              observer.next(response);
            },
            (error: any) => {
              if (error.status === 401) {
                /// AUTHENTICATION ERROR, HANDLE WHEN WE KNOW HOW
                this.handleAuthenticationError(error);
              } else {
                observer.error(error);
              }
            }
          );
          break;
        case RestCallType.put:
          this.put(finalURL, body, responseType, params, headers).subscribe(
            response => {
              observer.next(response);
            },
            (error: any) => {
              if (error.status === 401) {
                /// AUTHENTICATION ERROR, HANDLE WHEN WE KNOW HOW
                this.handleAuthenticationError(error);
              } else {
                observer.error(error);
              }
            }
          );
          break;
        default:
          observer.error('Incorrect call type');
      }
    });
  }

  /**
   * Create options object for Rest http call
   *
   * @param responseType  Http response type included in options (text / json)
   * @param params        Parameters of REST call
   * @param headers       Http header information
   */
  private getOptions(
    responseType: HttpResponseType = HttpResponseType.json,
    params?: HttpParams,
    headers?: HttpHeaders
  ): object {
    const options = { responseType: responseType === HttpResponseType.json ? 'json' : 'text' };
    if (params) {
      Object.assign(options, { params: params });
    }
    if (headers) {
      Object.assign(options, { headers: headers });
    }
    return options;
  }

  private handleAuthenticationError(error: Error) {}
}
