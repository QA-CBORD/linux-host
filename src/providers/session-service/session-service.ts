import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { GETService } from "../get-service/get-service";
import { MessageResponse } from "../../models/service/message-response.interface";


@Injectable()
export class SessionService extends GETService {

  private serviceUrl: string = '/json/session';
  static sessionId: string;
  static session: any;

  static setSessionId(sessionId: string) {
    if (sessionId) {
      this.sessionId = sessionId;
    }
  }

  static getSessionId(): string {
    return this.sessionId;
  }

  public getSession(sessionId): Observable<string> {

    if (SessionService.session) {

      return Observable.of(SessionService.session);

    } else {

      return Observable.create((observer: any) => {

        let postParams = {
          method: 'getSession',
          params: {
            sessionId: sessionId
          }
        };

        console.log(JSON.stringify(postParams));

        this.httpPost(this.serviceUrl, postParams)
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

  private setSession(sessionResponse: any) {
    if (sessionResponse.response) {
      console.log('Setting session ID: ' + sessionResponse.response.id);
      GETService.session = sessionResponse.response;
      GETService.sessionId = sessionResponse.response.id;
    }
  }


}
