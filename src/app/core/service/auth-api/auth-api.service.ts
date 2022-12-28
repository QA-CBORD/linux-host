import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserLogin } from '@core/model/user';
import { HttpClient } from '@angular/common/http';
import { RPCQueryConfig } from '@core/interceptors/query-config.model';
import { ServiceParameters } from '@core/model/service/message-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private serviceUrl = '/json/authentication';


  constructor(private readonly http: HttpClient) {}

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

    const queryConfig = new RPCQueryConfig('authenticateSystem', postParams);

    return this.http.post<any>(this.serviceUrl, queryConfig).pipe(map(({ response }) => response));
  }

  /**
   * Authenticate a User to get a User Session
   *
   * @param userCredentials User Login credentials
   */
  authenticateUser(userCredentials: UserLogin, isGuestUser: boolean): Observable<string> {
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

    const authenticatedUserMethod = (isGuestUser && 'authenticateGuestUser') || 'authenticateUser';

    const queryConfig = new RPCQueryConfig(authenticatedUserMethod, postParams);

    return this.http.post<any>(this.serviceUrl, queryConfig).pipe(
      map(({ response }) => response),
    );
  }

  authenticatePin(pin: string, deviceId: string): Observable<string> {
    const postParams = {
      systemCredentials: {
        domain: '',
        userName: 'get_mobile',
        password: 'NOTUSED',
      },
      deviceId,
      pin,
    };

    const queryConfig = new RPCQueryConfig('authenticatePIN', postParams);

    return this.http.post<any>(this.serviceUrl, queryConfig).pipe(
      map(({ response }) => response),
    );
  }

  /**
   * Retrieve authenticationToken passing in a sessionId
   *
   * @param sessionId String
   */
  getAuthenticationToken(): Observable<string> {
    const params: ServiceParameters = {};
    const queryConfig = new RPCQueryConfig('getAuthenticationToken', params, true);

    // MARK: Remove the token setting from the service
    return this.http.post<any>(this.serviceUrl, queryConfig).pipe(map(({ response }) => response));
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

    const queryConfig = new RPCQueryConfig('authenticateSessionToken', postParams);

    return this.http.post<any>(this.serviceUrl, queryConfig).pipe(
      map(({ response }) => response),
    );
  }

  /**
   * Retrieve a JWT from GET using a currently active session to use as an Access token for calling AWS services
   *
   */
  getExternalAuthenticationToken(externalSystem: string = null): Observable<string> {
    const postParams = {
      tokenType: null,
      externalSystem: externalSystem,
      claimSet: null,
    };

    const queryConfig = new RPCQueryConfig('retrieveExternalAuthenticationToken', postParams, true);

    return this.http.post<any>(this.serviceUrl, queryConfig).pipe(map(({ response }) => response));
  }

  retrieveAuthorizationBlob(deviceModel: string, deviceOSVersion: string): Observable<string> {
    const postParams = {
      deviceModel,
      deviceOSVersion,
    };
    const queryConfig = new RPCQueryConfig('retrieveAuthorizationBlob', postParams, true, false);
    return this.http.post<any>(this.serviceUrl, queryConfig);
  }
}

export interface SystemCredentials {
  userName: string;
  password: string;
  domain: string;
}
