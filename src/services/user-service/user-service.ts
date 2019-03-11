import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { GETService, ServiceParameters } from "../get-service/get-service";

import { MUserInfo } from "../../models/user/user-info.interface"


@Injectable()
export class UserService extends GETService {

  private serviceUrl: string = '/json/user';


  /**
   * Get the current User information using the current Session Id
   */
  public getUser(): Observable<MUserInfo> {

    return Observable.create((observer: any) => {

      let postParams: ServiceParameters = {};

      this.httpRequest(this.serviceUrl, 'retrieve', true, postParams)
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
