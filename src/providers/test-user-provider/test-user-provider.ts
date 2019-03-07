import { Events, Platform} from 'ionic-angular';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { GETService } from '../../services/get-service/get-service';
import { AuthService } from '../../services/auth-service/auth-service';

import { ExceptionProvider } from '../exception-provider/exception-provider';

import * as Globals from '../../app/app.global';
import { MUserLogin } from '../../models/user/user-login.interface';


import 'rxjs/add/operator/map';


@Injectable()
export class TestUserProvider {

  constructor(
    private authService: AuthService,
    public events: Events, 
    private platform: Platform) {
  }  


  /**
   *  Get Session Info using testing user credentials in Develpment
   *  Environment Institutions
   */
  public getTestUser(): Observable<string> {

  let gold7: MUserLogin = {
    userName: 'GSaas@tpsmail.dev',
    password: 'password1',
    domain: null,
    institutionId: '46054f40-71fc-4d32-a8de-64b525d3ce56'
  }

  let odysseyPreview: MUserLogin = {
    userName: 'getaws1@tpsmail.dev',
    password: 'password1',
    domain: null,
    institutionId: '1e418ca8-7148-4956-b7c4-1f35db6d8a11'
  }

  let sethsInstitution: MUserLogin = {
    userName: 'sac2@tpsmail.dev',
    password: 'password1',
    domain: null,
    institutionId: 'ec1307c4-d59e-4981-b5f9-860e23229a0d'
  }
    return Observable.create((observer: any) => {
      let userInfo: MUserLogin = gold7
  
      this.authService.authenticateUser(userInfo).subscribe(
        newSessionId => {
          //Got a new session
          GETService.setSessionId(newSessionId);
          //call back observer handler
          observer.next(newSessionId);
          observer.complete();
        },
        error => {
          //error show exception
          ExceptionProvider.showException(this.events, {
            displayOptions: Globals.Exception.DisplayOptions.TWO_BUTTON,
            messageInfo: {
              title: "No session created",
              message: error,
              positiveButtonTitle: "RETRY",
              positiveButtonHandler: () => {
                this.getTestUser();
              },
              negativeButtonTitle: "CLOSE",
              negativeButtonHandler: () => {
                this.platform.exitApp();
              }
            }
          });
          // call back observer handler for error
          observer.error(error);
        }
      );
    });
    
  }
}