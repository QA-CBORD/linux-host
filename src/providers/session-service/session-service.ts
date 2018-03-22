import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";

import { GETService } from "../get-service/get-service";
import { MessageResponse } from "../../models/service/message-response.interface";


@Injectable()
export class SessionService extends GETService {

  private serviceURL: string = '/json/session';
  static sessionId: string;
  static session: any;

  constructor(public http: Http) {
    super();
  }

  static setSessionId(sessionId: string) {
    if (sessionId) {
      this.sessionId = sessionId;
    }
  }

  static getSessionId(): string {
    return this.sessionId;
  }

  public getSession(sessionId): Observable<MessageResponse<string>> {
    if (SessionService.session) {
      return Observable.of(SessionService.session);
    } else {
      let postParams = {
        method: 'getSession',
        params: {
          sessionId: sessionId
        }
      };

      console.log(JSON.stringify(postParams));

      return this.http.post(this.baseUrl.concat(this.serviceURL), JSON.stringify(postParams), this.getOptions())
        .map(this.extractData)
        .do(this.logData)
        .do(this.setSession)
        .catch(this.handleError);
    }
  }

  private setSession(sessionResponse: any) {
    if (sessionResponse.response) {
      console.log('Setting session ID: ' + sessionResponse.response.id);
      GETService.session = sessionResponse.response;
      GETService.sessionId = sessionResponse.response.id;
    }
  }


}
