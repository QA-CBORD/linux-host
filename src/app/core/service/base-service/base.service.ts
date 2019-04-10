import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import {
  subscribeOn,
  observeOn,
  timeout,
  map,
  catchError, share,
} from 'rxjs/operators';
import { async } from 'rxjs/internal/scheduler/async';
import { queue } from 'rxjs/internal/scheduler/queue';

import { Environment } from '../../../environment';
import { DataCache } from '../../utils/data-cache';

export interface ServiceParameters {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  /// HTTP call timeout in milliseconds
  private TIMEOUT_MS = 15000;

  /// Local base url for HTTP calls
  protected baseUrl: string = null;

  constructor(private http: HttpClient) {}

  /**
   * HTTP request
   *
   * @param serviceUrl    URL for source of request
   * @param methodName    Name of method for request
   * @param bUseSessionId Boolean flag for using or not session id in request
   * @param postParams    Parameters for request
   */
  protected httpRequest(
    serviceUrl: string,
    methodName: string,
    bUseSessionId: boolean,
    postParams: ServiceParameters
  ): Observable<any> {
    this.baseUrl = Environment.getGETServicesBaseURL();

    if (bUseSessionId) {
      postParams.sessionId = DataCache.getSessionId();
    }

    const finalParams: ServiceParameters = {
      method: methodName,
      params: postParams,
    };

    return this.http
      .post(
        this.baseUrl.concat(serviceUrl),
        JSON.stringify(finalParams),
        this.getOptions()
      )
      .pipe(
        subscribeOn(async),
        observeOn(queue),
        timeout(this.TIMEOUT_MS),
        map(response => this.extractData(response)),
        catchError(error => this.handleError(error))
      );
  }

  /**
   * Handle the error response from HTTP calls
   *
   * @param error     Error returned from call
   */
  protected handleError(error: any) {
    return throwError(error);
  }

  /**
   * Format the data returned from HTTP calls
   *
   * @param response    Response returned from call
   */
  protected extractData(response: any) {
    if (response.exception) {
      this.parseExceptionResponse(response.exception);
    } else {
      return response;
    }
  }

  /**
   * Parses the exception message returned with an HTTP call error
   *
   * @param response    Response returned from call
   */
  protected parseExceptionResponse(exceptionString: string) {
    // check the exception string for a number|description string format
    const regEx = new RegExp('^[0-9]*|.*$');
    if (regEx.test(exceptionString)) {
      const parts = exceptionString.split('|');
      this.determineErrorByCodeAndThrow(
        parts[0],
        parts.length > 1 ? parts[1] : null
      );
    } else {
      throw new Error('Unexpected error occurred.');
    }
  }

  /**
   * Handle error codes returned from HTTP calls
   *
   * @param code    Exception code
   */
  protected determineErrorByCodeAndThrow(code: string, message: string) {
    const newError = new Error('Unexpected error occured.');
    switch (code) {
      case '9999':
        newError.name = 'CannotParseResponseException';
        newError.message = 'Unable to parse response';
        break;
      case '4001':
        newError.name = 'NoSuchSessionException';
        newError.message = 'Invalid session';
        break;
      case '9801':
        newError.name = 'InvalidServiceArgumentException';
        newError.message = 'InvalidServiceArgumentException';
        break;
      case '6100':
        newError.name = 'PaymentSystemGatewayException';
        newError.message = message;
        break;
      case '6113':
        newError.name = 'PaymentSystemBusinessLogicException';
        newError.message = message;
        break;
    }
    throw newError;
  }

  /**
   * Get HTTP request header options
   */
  protected getOptions(): any {
    return {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    };
  }
}
