/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { subscribeOn, observeOn, timeout, catchError } from 'rxjs/operators';
import { async } from 'rxjs/internal/scheduler/async';
import { queue } from 'rxjs/internal/scheduler/queue';
import { environmentFacadeService } from '@core/facades/environment/environment.facade.service';

export enum RestCallType {
  get,
  post,
  put,
  delete,
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

  constructor(private readonly environmentFacadeService: environmentFacadeService, private http: HttpClient) {}

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
    const options = this.getOptions(responseType, params, headers);

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
   * @param body
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
   * @param body
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
   *  DELETE call to AWS API Gateway
   *
   * @param url           URL of REST call
   * @param body
   * @param responseType  Http response type included in options (text / json)
   * @param params        Parameters of REST call
   * @param headers       Http header information
   */
  delete(
    url: string,
    responseType: HttpResponseType = HttpResponseType.json,
    params?: HttpParams,
    headers?: HttpHeaders
  ): Observable<any> {
    const options = this.getOptions(responseType, params, headers);
    return this.http.delete(url, options).pipe(
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
    const finalURL = this.environmentFacadeService.getSecureMessagingAPIURL().concat(resourceURL);
    let httpCall$;
    switch (callType) {
      case RestCallType.get:
        httpCall$ = this.get<any>(finalURL, responseType, params, headers);
        break;
      case RestCallType.post:
        httpCall$ = this.post(finalURL, body, responseType, params, headers);
        break;
      case RestCallType.put:
        httpCall$ = this.put(finalURL, body, responseType, params, headers);
        break;
    }

    return httpCall$.pipe(catchError(() => throwError({ message: 'There was an issue with the request' })));
  }

  /**
   * Call to REST backend (Partner API Gateway)
   *
   * @param callType      REST call type (post, put, get, etc)
   * @param resourceURL   URL of resource in API
   * @param responseType  Http response type (text / json)
   * @param body          Body of call
   * @param params        Parameters of call
   * @param headers       Http header information
   */
  partnerHTTPCall(
    callType: RestCallType,
    resourceURL: string,
    responseType: HttpResponseType = HttpResponseType.json,
    body?: any,
    params?: HttpParams,
    headers?: HttpHeaders
  ): Observable<any> {
    const finalURL = this.environmentFacadeService.getPartnerServicesURL().concat(resourceURL);
    let httpCall$: Observable<any>;
    switch (callType) {
      case RestCallType.get:
        httpCall$ = this.get<any>(finalURL, responseType, params, headers);
        break;
      case RestCallType.post:
        httpCall$ = this.post(finalURL, body, responseType, params, headers);
        break;
      case RestCallType.put:
        httpCall$ = this.put(finalURL, body, responseType, params, headers);
        break;
      case RestCallType.delete:
        httpCall$ = this.delete(finalURL, responseType, params, headers);
        break;
    }
    return httpCall$;
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
}
