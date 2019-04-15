import { Injectable } from '@angular/core';
import { BaseService, ServiceParameters } from '../base-service/base.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MUserInfo } from 'src/app/core/model/user/user-info.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {

  private serviceUrl = '/json/user';
  
  /**
   * Get the current User information using the current Session Id
   */
  getUser(): Observable<MUserInfo> {
    const postParams: ServiceParameters = {};

    return this.httpRequest(this.serviceUrl, 'retrieve', true, postParams)
      .pipe(
        map((data) => data.response),
      );
  }

}
