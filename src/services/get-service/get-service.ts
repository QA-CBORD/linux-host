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


export interface ServiceParameters {
  [key: string]: any
}

@Injectable()
export class GETService {

  /// Local session data
  static sessionId: string;
  static session: any;

  /// HTTP call timeout in milliseconds
  private TIMEOUT_MS = 15000;

  /// Local base url for HTTP calls
  protected baseUrl: string = null;

  constructor(
    private http: Http
  ) {

  }

  /**
   * HTTP request
   * 
   * @param serviceUrl    URL for source of request
   * @param methodName    Name of method for request
   * @param postParams    Parameters for request
   */
  protected httpRequest(serviceUrl: string, methodName: string, bUseSessionId: boolean, postParams: ServiceParameters): Observable<any> {
    this.baseUrl = Environment.getGETServicesBaseURL();

    if (bUseSessionId) {
      postParams.sessionId = GETService.getSessionId();
    }

    let finalParams: ServiceParameters = {};
    finalParams.method = methodName;
    finalParams.params = postParams;

    console.log(finalParams);

    return this.http.post(this.baseUrl.concat(serviceUrl), JSON.stringify(finalParams), this.getOptions())
      .timeout(this.TIMEOUT_MS)
      .map(this.extractData)
      .do(this.logData)
      .catch(this.handleError);
  }

  /**
   * Old HTTP request
   * 
   * @param serviceUrl    URL for source of request
   * @param postParams    Parameters for request
   */
  protected httpPost(serviceUrl: string, postParams: any): Observable<any> {
    this.baseUrl = Environment.getGETServicesBaseURL();
    return this.http.post(this.baseUrl.concat(serviceUrl), JSON.stringify(postParams), this.getOptions())
      .timeout(this.TIMEOUT_MS)
      .map(this.extractData)
      .do(this.logData)
      .catch(this.handleError);
  }

  /**
   * Handle the error response from HTTP calls
   * 
   * @param error     Error returned from call
   */
  protected handleError(error: Response | any) {
    console.log(error);
    return Observable.throw(error);
  }

  /**
   * Format the data returned from HTTP calls
   * 
   * @param response    Response returned from call
   */
  protected extractData(response: Response) {

    console.log(response);
    try {
      let tResponse = response.json();
      if (!tResponse.response || tResponse.exception) {
        console.log(tResponse);
        this.parseExceptionResponse(response);
      } else {
        return tResponse;
      }
    } catch (error) {
      return { response: null, exception: 'An unknown error occurred.' };
    }
  }

  /**
   * Parses the exception message returned with an HTTP call error
   * 
   * @param response    Response returned from call
   */
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

  /**
   * Get HTTP request header options
   */
  protected getOptions(): RequestOptions {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return new RequestOptions({ headers: headers })
  }

  /**
   * Get local static session id
   */
  public getSessionId(): string {
    return GETService.sessionId;
  }

  /**
   * Set local static session id
   * 
   * @param sessionId     New session id
   */
  public setSessionId(sessionId: string) {
    GETService.sessionId = sessionId;
  }

  /**
   * Static method to set local static session id 
   * 
   * @param newSessionId    New session id
   */
  static setSessionId(newSessionId: string) {
    GETService.sessionId = newSessionId;
  }

  /**
   * Retrieve local static session id
   */
  static getSessionId(): string {
    return GETService.sessionId;
  }

  /**
   * Static method to set local static session data
   * 
   * @param newSession    New session data
   */
  static setSession(newSession: any) {
    GETService.session = newSession;
  }

  /**
   * Retrieve local static session data
   */
  static getSession(): any {
    return GETService.session;
  }

  /**
   * Handle error codes returned from HTTP calls
   * 
   * @param code    Exception code
   */
  protected handleErrorCode(code) {
    if (code == '4001') {
      throw new Error("Invalid session");
    } else if (code = '9801') {
      throw new Error("InvalidServiceArgumentException");
    } else {
      throw new Error("Unexpected system exception occured.");
    }
  }


  protected mapToJSONString(map: Map<any, any>): string {
    return JSON.stringify(
      Array.from(
        map.entries()
      )
        .reduce((o, [key, value]) => {
          o[key] = value;

          return o;
        }, {}));
  }

}
