import { Injectable } from '@angular/core';

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { GETService, ServiceParameters } from "../get-service/get-service";

import { UserLogin } from "../../models/user/user-login.interface";

@Injectable()
export class AuthService extends GETService {

  private serviceUrl: string = '/json/authentication';


  /**
   *  Authenticate the device/system to get a device session
   */
  authenticateSystem(): Observable<string> {

    return Observable.create((observer: any) => {
      let postParams: ServiceParameters = {
        systemCredentials: {
          domain: '',
          userName: 'get_mobile',
          password: 'NOTUSED'
        }
      }

      console.log(JSON.stringify(postParams));

      this.httpRequest(this.serviceUrl, 'authenticateSystem', false, postParams)
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

  /**
   * Authenticate a User to get a User Session
   * 
   * @param userCredentials User Login credentials
   */
  authenticateUser(userCredentials: UserLogin): Observable<string> {

    return Observable.create((observer: any) => {
      let postParams = {
        systemCredentials: {
          domain: '',
          userName: 'get_mobile',
          password: 'NOTUSED'
        },
        userCredentials: {
          userName: userCredentials.userName,
          password: userCredentials.password,
          domain: userCredentials.domain,
          institutionId: userCredentials.institutionId
        }
      }

      console.log(JSON.stringify(postParams));

      this.httpRequest(this.serviceUrl, 'authenticateUser', false, postParams)
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

  /**
   * Authenticate a Session Token (session sharing) to get a new User Session
   * 
   * @param sessionToken Session Token passed to device/system
   */
  authenticateSessionToken(sessionToken: string): Observable<string> {

    return Observable.create((observer: any) => {
      let postParams = {
        systemCredentials: {
          domain: '',
          userName: 'get_mobile',
          password: 'NOTUSED'
        },
        sessionToken: sessionToken
      }

      console.log(JSON.stringify(postParams));

      return this.httpRequest(this.serviceUrl, 'authenticateSessionToken', false, postParams)
        .subscribe(
          data => {
            // validate data and send to observer
            observer.next(data.response);
            observer.complete();
          },
          error => {
            // do error stuff then push it to observer
            observer.error(error);
          }
        )
    });

  }

  /**
   * Retrieve a JWT from GET to use as an Access token for calling AWS services
   * 
   */
  retrieveExternalAuthenticationToken(): Observable<string> {

    return Observable.create((observer: any) => {
      let postParams = {
        systemCredentials: {
          domain: '',
          userName: 'get_mobile',
          password: 'NOTUSED'
        },
        tokenType:null,
        externalSystem:null,
        claimSet:null
      }

      console.log(JSON.stringify(postParams));

      return this.httpRequest(this.serviceUrl, 'retrieveExternalAuthenticationToken', true, postParams)
        .subscribe(
          data => {
            // validate data and send to observer
            observer.next(data.response);
            observer.complete();
          },
          error => {
            // do error stuff then push it to observer
            observer.error(error);
          }
        )
    });

  }
}
