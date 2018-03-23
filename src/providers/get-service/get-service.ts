import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { Environment } from '../../app/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { MessageResponse } from '../../models/service/message-response.interface';
import { SystemAuthentication } from '../../models/authentication/system-authentication.interface';
import { InstitutionInfoList } from '../../models/institution/institution-info-list.interface';
import { DataCache } from "../data-cache/data-cache";

@Injectable()
export class GETService {

  static sessionId: string;
  static session: any;

  protected baseUrl: string = Environment.servicesBaseURL;

  constructor() {
  }

  protected handleError(error: Response | any) {
    return Observable.throw(error);
  }

  protected extractData(response: Response) {
    let tResponse = response.json();
    if (!tResponse.response || tResponse.exception) {
      console.log(tResponse);
      this.parseExceptionResponse(response);
    } else {
      return tResponse;
    }
  }

  protected parseExceptionResponse(response) {
    if (response != null && response.exception) {
      // check the exception string for a number|description string format
      let regEx = new RegExp('^[0-9]*|.*$');
      if (regEx.test(response.exception)) {
        let parts = response.exception.split("|");
        this.handleErrorCode(parts[0]);
      } else {
        throw new Error("Unexpected system exception occured.");
      }
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
