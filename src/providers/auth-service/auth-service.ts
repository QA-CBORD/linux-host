import { Injectable } from '@angular/core';

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { GETService } from "../get-service/get-service";

import { MessageResponse } from "../../models/service/message-response.interface";
import { UserLogin } from "../../models/user/user-login.interface";

@Injectable()
export class AuthService extends GETService {

  private serviceUrl: string = '/json/authentication';


  authenticateSystem(): Observable<string> {

    return Observable.create((observer: any) => {
      let postParams = {
        method: 'authenticateSystem',
        params: {
          systemCredentials: {
            domain: '',
            userName: 'get_mobile',
            password: 'NOTUSED'
          }
        }
      }

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

  authenticateUser(userCredentials: UserLogin): Observable<string> {

    return Observable.create((observer: any) => {
      let postParams = {
        method: 'authenticateUser',
        params: {
          systemCredentials: {
            domain: '',
            userName: 'get_mobile',
            password: 'NOTUSED'
          },
          userCredentials: {
            userName: 'devpcs1@tpsmail.dev',
            password: 'password1',
            domain: null,
            institutionId: '084cfc39-4b2e-486f-9458-843c09548a85'
          }
        }
      }

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

  authenticateSessionToken(sessionToken: string): Observable<String> {

    return Observable.create((observer: any) => {
      let postParams = {
        method: 'authenticateSessionToken',
        params: {
          systemCredentials: {
            domain: '',
            userName: 'get_mobile',
            password: 'NOTUSED'
          },
          sessionToken: sessionToken
        }
      }

      console.log(JSON.stringify(postParams));

      return this.httpPost(this.serviceUrl, postParams)
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
