import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseService, ServiceParameters } from '../base-service/base.service';

import { UserLogin } from '../../model/user';
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

    return this.httpRequest<any>(this.serviceUrl, 'authenticateSystem', false, postParams).pipe(
      map(({ response }) => response)
    );
  }

  /**
   * Authenticate a User to get a User Session
   *
   * @param userCredentials User Login credentials
   */
  authenticateUser(userCredentials: UserLogin): Observable<string> {
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

    return this.httpRequest<any>(this.serviceUrl, 'authenticateUser', false, postParams).pipe(
      map(({ response }) => response)
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

    return this.httpRequest<any>(this.serviceUrl, 'authenticateSessionToken', false, postParams).pipe(
      map(({ response }) => response)
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

    return this.httpRequest<any>(this.serviceUrl, 'retrieveExternalAuthenticationToken', true, postParams).pipe(
      map(({ response }) => response)
    );
  }
}
