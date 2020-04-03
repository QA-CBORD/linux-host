import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { subscribeOn, observeOn, timeout, map, catchError } from 'rxjs/operators';
import { async } from 'rxjs/internal/scheduler/async';
import { queue } from 'rxjs/internal/scheduler/queue';

import { Environment } from '../../../environment';
import { DataCache } from '@core/utils/data-cache';
import { NUM_DSCRPTN_REGEXP } from '@core/utils/regexp-patterns';

export interface ServiceParameters {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  /// HTTP call timeout in milliseconds
  private TIMEOUT_MS = 30000;

  /// Local base url for HTTP calls
  protected baseUrl: string = null;

  constructor(protected readonly http: HttpClient) {}

  protected httpRequest<T>(
    serviceUrl: string,
    methodName: string,
    bUseSessionId: boolean,
    postParams: ServiceParameters = {}
  ): Observable<T> {
    return this.httpRequestFull(serviceUrl, methodName, bUseSessionId, null, postParams);
  }

  protected httpRequestFull<T>(
    serviceUrl: string,
    methodName: string,
    bUseSessionId: boolean,
    institutionId: string,
    postParams: ServiceParameters
  ): Observable<T> {
    this.baseUrl = Environment.getServicesURL();

    if (bUseSessionId) {
      postParams.sessionId = DataCache.getSessionId();
    }
    if (institutionId) {
      postParams.institutionId = institutionId;
    }

    const finalParams: ServiceParameters = {
      method: methodName,
      params: postParams,
    };

    return this.http.post(this.baseUrl.concat(serviceUrl), JSON.stringify(finalParams), this.getOptions()).pipe(
      subscribeOn(async),
      observeOn(queue),
      timeout(this.TIMEOUT_MS),
      map(response => this.errorDetection(response)),
      catchError(error => this.handleError(error))
    );
  }

  // XXX - Remove this block of code and organize error catching and handling directly in the
  // services which are inherited from this service

  protected handleError(error: any) {
    return throwError(error);
  }

  protected errorDetection(response: any) {
    if (response.exception) {
      this.parseExceptionResponse(response.exception);
    } else {
      return response;
    }
  }

  protected parseExceptionResponse(exceptionString: string = '') {
    // check the exception string for a number|description string format
    if (exceptionString.search(NUM_DSCRPTN_REGEXP) !== -1) {
      const parts = exceptionString.split('|');
      this.determineErrorByCodeAndThrow(parts[0], parts.length > 1 ? parts[1] : null);
    } else {
      throw new Error('Unexpected error occurred.');
    }
  }

  protected determineErrorByCodeAndThrow(code: string, message: string) {
    const newError = new Error(`${code}|${message}`);
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
        newError.message = 'Transaction failed';
        break;
      case '6113':
        newError.name = 'PaymentSystemBusinessLogicException';
        newError.message = 'There was an issue with the transaction';
        break;
    }
    throw newError;
  }

  // XXX - end of block

  protected getOptions(): any {
    return {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    };
  }
}
