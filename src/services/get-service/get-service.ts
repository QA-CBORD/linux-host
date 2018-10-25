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
    return Observable.throw(error);
  }

  /**
   * Format the data returned from HTTP calls
   * 
   * @param response    Response returned from call
   */
  protected extractData(response: Response) {
    console.log("ExtractData");
    console.log(response);

    let tResponse = response.json();
    console.log("ExtractData - Body");
    console.log(tResponse);
    if(tResponse.exception){
      this.stupidErrorFunction(tResponse.exception);
    
    // if (tResponse.exception) {
    //   console.log("ExDat: ParseExcep");
    //   console.log("ExDat: ParseExcep2");


    //   this.logData("TEstText LOG BS");
    //   console.log("ExDat: ParseExcep3");
    } else {
      return tResponse;
    }

  }

  /**
   * Parses the exception message returned with an HTTP call error
   * 
   * @param response    Response returned from call
   */
  protected stupidErrorFunction(exceptionString: string) {

    console.log("ParseExcep: start");
    // check the exception string for a number|description string format
    let regEx = new RegExp('^[0-9]*|.*$');
    if (regEx.test(exceptionString)) {
      let parts = exceptionString.split("|");
      // this.determineErrorByCodeAndThrow(parts[0], parts.length > 1 ? parts[1] : null);
    } else {
      throw new Error("Unexpected error occurred.");
    }
  
  }

  /**
   * Handle error codes returned from HTTP calls
   * 
   * @param code    Exception code
   */
  protected determineErrorByCodeAndThrow(code: string, message: string) {
    let newError = new Error("Unexpected exception occured.");
    switch (code) {
      case '4001':
        newError.name = "NoSuchSessionException";
        newError.message = "Invalid session";
        break;
      case '9801': /// InvalidServiceArgumentException
        newError.name = "InvalidServiceArgumentException"
        newError.message = "InvalidServiceArgumentException";
        break;
      case '6100':
        newError.name = "PaymentSystemGatewayException";
        newError.message = message;
        break;
      case '6113':
        newError.name = "PaymentSystemBusinessLogicException";
        newError.message = message;
        break;
    }
    throw newError;
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

}
