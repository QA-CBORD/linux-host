import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseService, ServiceParameters } from '../base-service/base.service';

import { MUserInfo } from 'src/app/core/model/user/user-info.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  private serviceUrl = '/json/user';


  /**
   * Get the current User information using the current Session Id
   */
  getUser(): Observable<MUserInfo> {

    return Observable.create((observer: any) => {

      const postParams: ServiceParameters = {};

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
