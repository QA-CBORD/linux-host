import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Environment } from '../../app/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/timeout';

@Injectable()
export class GETService {

  static sessionId: string;
  static session: any;

  private TIMEOUT_MS = 15000;

  protected baseUrl: string = Environment.servicesBaseURL;

  constructor(
    private http: Http
  ) {
  }


  protected httpPost(serviceUrl: string, postParams: any): Observable<any> {
    return this.http.post(this.baseUrl.concat(serviceUrl), JSON.stringify(postParams), this.getOptions())
      .timeout(this.TIMEOUT_MS)
      .map(this.extractData)
      .do(this.logData)
      .catch(this.handleError);
  }

  protected httpPostNew(serviceUrl: string, functionName: string, bUseSessionId: boolean, parameterMap: any): Observable<any> {

    if (bUseSessionId) {
      parameterMap.set('sessionId', GETService.getSessionId());
    }

    let finalParams = {
      method: functionName,
      params: parameterMap
    }

    return this.http.post(this.baseUrl.concat(serviceUrl), JSON.stringify(finalParams), this.getOptions())
      .timeout(this.TIMEOUT_MS)
      .map(this.extractData)
      .do(this.logData)
      .catch(this.handleError);
  }

  protected handleError(error: Response | any) {

    console.log('Handle Error 0');
    console.log(error);
    return Observable.throw(error);
  }

  protected extractData(response: Response) {
    console.log('Extract Data 0');
    try {
      let tResponse = response.json();

      console.log('Extract Data 1');
      if (!tResponse.response || tResponse.exception) {

        console.log('Extract Data 2');
        console.log(tResponse);
        this.parseExceptionResponse(response);
      } else {

        console.log('Extract Data 3');
        return tResponse;
      }
    } catch (error) {

      console.log('Extract Data 4');
      return { response: null, exception: 'An unknown error occurred.' };
    }
  }

  protected parseExceptionResponse(response) {
    if (response != null && response.exception != null) {
      // check the exception string for a number|description string format
      let regEx = new RegExp('^[0-9]*|.*$');
      if (regEx.test(response.exception)) {
        try {
          let parts = response.exception.split("|");
          this.handleErrorCode(parts[0]);
        } catch (error) {
          this.handleError("An unknown error occurred.");
        }
      } else {
        throw new Error("Unexpected error occurred.");
      }
    } else {
      throw new Error("The response was empty or malformed.");
    }
  }

  protected logData(response: any) {
    console.log(response);
  }

  protected getOptions(): RequestOptions {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return new RequestOptions({ headers: headers })
  }

  public getSessionId(): string {
    return GETService.sessionId;
  }

  public setSessionId(sessionId: string) {
    GETService.sessionId = sessionId;
  }

  static setSessionId(newSessionId: string) {
    GETService.sessionId = newSessionId;
  }

  static getSessionId(): string {
    return GETService.sessionId;
  }

  static setSession(newSession: any) {
    GETService.session = newSession;
  }

  static getSession(): any {
    return GETService.session;
  }

  protected handleErrorCode(code) {
    if (code == '4001') {
      throw new Error("Invalid session");
    } else if (code = '9801') {
      throw new Error("InvalidServiceArgumentException");
    } else {
      throw new Error("Unexpected system exception occured.");
    }
  }
}
