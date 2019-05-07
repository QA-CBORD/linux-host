import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseService, ServiceParameters } from '../base-service/base.service';

import { MUserLogin } from '../../model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  private serviceUrl = '/json/authentication';

  /**
   *  Authenticate the device/system to get a device session
   */
  authenticateSystem(): Observable<string> {
    return Observable.create((observer: any) => {
      const postParams: ServiceParameters = {
        systemCredentials: {
          domain: '',
          userName: 'get_mobile',
          password: 'NOTUSED',
        },
      };

      this.httpRequest<any>(this.serviceUrl, 'authenticateSystem', false, postParams).subscribe(
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

  /**
   * Authenticate a User to get a User Session
   *
   * @param userCredentials User Login credentials
   */
  authenticateUser(userCredentials: MUserLogin): Observable<string> {
    return Observable.create((observer: any) => {
      const postParams = {
        systemCredentials: {
          domain: '',
          userName: 'get_mobile',
          password: 'NOTUSED',
        },
        userCredentials: {
          userName: userCredentials.userName,
          password: userCredentials.password,
          domain: userCredentials.domain,
          institutionId: userCredentials.institutionId,
        },
      };

      this.httpRequest<any>(this.serviceUrl, 'authenticateUser', false, postParams).subscribe(
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

  /**
   * Authenticate a Session Token (session sharing) to get a new User Session
   *
   * @param sessionToken Session Token passed to device/system
   */
  authenticateSessionToken(sessionToken: string): Observable<string> {
    return Observable.create((observer: any) => {
      const postParams = {
        systemCredentials: {
          domain: '',
          userName: 'get_mobile',
          password: 'NOTUSED',
        },
        sessionToken: sessionToken,
      };

      return this.httpRequest<any>(this.serviceUrl, 'authenticateSessionToken', false, postParams).subscribe(
        data => {
          // validate data and send to observer
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

  /**
   * Retrieve a JWT from GET using a currently active session to use as an Access token for calling AWS services
   *
   */
  getExternalAuthenticationToken(): Observable<string> {
    return Observable.create((observer: any) => {
      const postParams = {
        tokenType: null,
        externalSystem: null,
        claimSet: null,
      };

      return this.httpRequest<any>(this.serviceUrl, 'retrieveExternalAuthenticationToken', true, postParams).subscribe(
        data => {
          // validate data and send to observer
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
