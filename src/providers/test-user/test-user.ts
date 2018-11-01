import { UserLogin } from './../../models/user/user-login.interface';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { GETService } from '../../services/get-service/get-service';
import { AuthService } from '../../services/auth-service/auth-service';
import { ExceptionProvider } from '../../providers/exception-provider/exception-provider';
import * as Globals from '../../app/app.global';
import { IonicPage, NavController, NavParams, Events, Platform, PopoverController, ModalController } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the TestUserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class TestUserProvider {

  constructor(
    public http: Http, 
    private authService: AuthService,
    public events: Events, 
    private platform: Platform) {
    console.log('Hello TestUserProvider Provider');
  }

  public getTestUser(): Observable<string> {

  let gold7: UserLogin = {
    userName: 'GSaas@tpsmail.dev',
    password: 'password1',
    domain: null,
    institutionId: '46054f40-71fc-4d32-a8de-64b525d3ce56'
  }

  let odysseyPreview: UserLogin = {
    userName: 'getaws1@tpsmail.dev',
    password: 'password1',
    domain: null,
    institutionId: '1e418ca8-7148-4956-b7c4-1f35db6d8a11'
  }

  let sethsInstitution: UserLogin = {
    userName: 'sac2@tpsmail.dev',
    password: 'password1',
    domain: null,
    institutionId: 'ec1307c4-d59e-4981-b5f9-860e23229a0d'
  }
    return Observable.create((observer: any) => {
      let userInfo: UserLogin = gold7
  
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