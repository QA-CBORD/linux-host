import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { GETService } from "../get-service/get-service";


@Injectable()
export class SessionService extends GETService {

  private serviceUrl: string = '/json/session';
  static sessionId: string;
  static session: any;

  /**
   * Set the current Session Id
   * 
   * @param sessionId New Session Id
   */
  static setSessionId(sessionId: string) {
    if (sessionId) {
      this.sessionId = sessionId;
    }
  }

  /**
   * Get the current Session Id
   */
  static getSessionId(): string {
    return this.sessionId;
  }


  /**
   * Get the Session Object with a Session ID
   * First attempt to get current session if it exists, then try to create and return a new session
   * 
   * @param sessionId Current Session Id
   */
  public getSession(sessionId: string): Observable<string> {

    if (SessionService.session) {

      return Observable.of(SessionService.session);

    } else {

      return Observable.create((observer: any) => {

        let postParams = {
          sessionId: sessionId
        };

        this.httpRequest(this.serviceUrl, 'getSession', true, postParams)
          .do(this.setSession)
          .subscribe(
            data => {
              // validate data then throw error or send
              observer.next(data.response);
              observer.complete();
            },
            error => {
              // do error stuff then push it to observer
              observer.error(error);
            }
          );
      });
    }
  }

  /**
   * Set current Session Id and Session object from http request
   * 
   * @param sessionResponse Response from http request for Session Info
   */
  private setSession(sessionResponse: any) {
    if (sessionResponse.response) {
      GETService.session = sessionResponse.response;
      GETService.sessionId = sessionResponse.response.id;
    }
  }


}
