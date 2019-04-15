import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseService, ServiceParameters } from './../base-service/base.service';

import { MUserLogin } from '../../model/user/user-login.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {

  private serviceUrl = '/json/authentication';

  /**
   *  Authenticate the device/system to get a device session
   */
  authenticateSystem(): Observable<string> {
    const postParams: ServiceParameters = {
      systemCredentials: {
        domain: '',
        userName: 'get_mobile',
        password: 'NOTUSED',
      },
    };

    return this.httpRequest(this.serviceUrl, 'authenticateSystem', false, postParams)
      .pipe(
        map((data) => data.response),
      );

  }

  /**
   * Authenticate a User to get a User Session
   *
   * @param userCredentials User Login credentials
   */
  authenticateUser(userCredentials: MUserLogin): Observable<string> {
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

    return this.httpRequest(this.serviceUrl, 'authenticateUser', false, postParams)
      .pipe(
        map((data) => data.response),
      );
  }

  /**
   * Authenticate a Session Token (session sharing) to get a new User Session
   *
   * @param sessionToken Session Token passed to device/system
   */
  authenticateSessionToken(sessionToken: string): Observable<string> {
    const postParams = {
      systemCredentials: {
        domain: '',
        userName: 'get_mobile',
        password: 'NOTUSED',
      },
      sessionToken: sessionToken,
    };

    return this.httpRequest(this.serviceUrl, 'authenticateSessionToken', false, postParams)
      .pipe(
        map((data) => data.response),
      );
  }

  /**
   * Retrieve a JWT from GET using a currently active session to use as an Access token for calling AWS services
   *
   */
  getExternalAuthenticationToken(): Observable<string> {
    const postParams = {
      tokenType: null,
      externalSystem: null,
      claimSet: null,
    };

    return this.httpRequest(this.serviceUrl, 'retrieveExternalAuthenticationToken', true, postParams)
      .pipe(
        map((data) => data.response),
      );

  }
}
