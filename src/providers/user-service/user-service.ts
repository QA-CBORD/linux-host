import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { GETService } from "../get-service/get-service";
import { MessageResponse } from "../../models/service/message-response.interface";
import { UserInfo } from "../../models/user/user-info.interface"


@Injectable()
export class UserService extends GETService {

  private serviceUrl: string = '/json/user';

  public getUser(sessionId): Observable<UserInfo> {

    return Observable.create((observer: any) => {

      let postParams = {
        method: 'retrieve',
        params: {
          sessionId: sessionId
        }
      };

      console.log(JSON.stringify(postParams));

      this.httpPost(this.serviceUrl, postParams)
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
