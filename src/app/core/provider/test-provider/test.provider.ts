import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';

import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../../service/auth-service/auth.service';

import * as Globals from '../../../app.global';

import { MUserLogin } from '../../model/user/user-login.interface';
import { ExceptionProvider } from '../exception-provider/exception.provider';
import { DataCache } from '../../utils/data-cache';


@Injectable({
  providedIn: 'root',
})
export class TestProvider {

  constructor(
    private events: Events,
    private authService: AuthService,
  ) {
  }

  /**
   *  Get Session Info using testing user credentials in Develpment
   *  Environment Institutions
   */
  getTestUser(): Observable<string> {
    const gold7: MUserLogin = {
      userName: 'GSaas@tpsmail.dev',
      password: 'password1',
      domain: null,
      institutionId: '46054f40-71fc-4d32-a8de-64b525d3ce56',
    };

    const odysseyPreview: MUserLogin = {
      userName: 'getaws1@tpsmail.dev',
      password: 'password1',
      domain: null,
      institutionId: '1e418ca8-7148-4956-b7c4-1f35db6d8a11',
    };

    const sethsInstitution: MUserLogin = {
      userName: 'sac2@tpsmail.dev',
      password: 'password1',
      domain: null,
      institutionId: 'ec1307c4-d59e-4981-b5f9-860e23229a0d',
    };

    return this.authService.authenticateUser(gold7)
      .pipe(
        tap((newSessionId) => DataCache.setSessionId(newSessionId)),
        catchError((error) => {
          /// error show exception
          ExceptionProvider.showException(this.events, {
            displayOptions: Globals.Exception.DisplayOptions.TWO_BUTTON,
            messageInfo: {
              title: 'No session created',
              message: error,
              positiveButtonTitle: 'RETRY',
              positiveButtonHandler: () => {
                this.getTestUser();
              },
              negativeButtonTitle: 'CLOSE',
              negativeButtonHandler: () => {
                // this.platform.exitApp();
              },
            },
          });

          throw new Error(error);
        }),
      );
  }
}
