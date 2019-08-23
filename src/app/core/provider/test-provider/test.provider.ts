import { Injectable } from '@angular/core';

import { AuthService } from '../../service/auth-service/auth.service';
import { DataCache } from '../../utils/data-cache';
import { UserLogin } from '../../model/user';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TestProvider {
  constructor(private authService: AuthService) {}

  /**
   *  Get Session Info using testing user credentials in Develpment
   *  Environment Institutions
   */
  getTestUser(): Observable<string> {
    const gold7: UserLogin = {
      userName: 'GSaas@tpsmail.dev',
      password: 'password1',
      domain: null,
      institutionId: '46054f40-71fc-4d32-a8de-64b525d3ce56',
    };

    const gold7_1: UserLogin = {
      userName: 'BSaas@tpsmail.dev',
      password: 'password1',
      domain: null,
      institutionId: '46054f40-71fc-4d32-a8de-64b525d3ce56',
    };

    const gold7_Yarik_G7: UserLogin = {
      userName: 'yxp@test.cbord.com',
      password: 'Dn210778pms#',
      domain: null,
      institutionId: '46054f40-71fc-4d32-a8de-64b525d3ce56',
    };

    const gold7_Yarik_odyssey: UserLogin = {
      userName: 'yxp@test.cbord.com',
      password: 'Dn210778pms#',
      domain: null,
      institutionId: '72ae1e24-2e31-4927-82a5-4379081e4334',
    };

    const odysseyPreview: UserLogin = {
      userName: 'getaws1@tpsmail.dev',
      password: 'password1',
      domain: null,
      institutionId: '1e418ca8-7148-4956-b7c4-1f35db6d8a11',
    };
    const odysseyPreview2: UserLogin = {
      userName: 'getaws2@tpsmail.dev',
      password: 'password1',
      domain: null,
      institutionId: '1e418ca8-7148-4956-b7c4-1f35db6d8a11',
    };

    const odysseyPreviewTest: UserLogin = {
      userName: 'yxp@test.cbord.com',
      password: 'Dn210778pms#',
      domain: null,
      institutionId: '1e418ca8-7148-4956-b7c4-1f35db6d8a11',
    };

    const sethsInstitution: UserLogin = {
      userName: 'sac2@tpsmail.dev',
      password: 'password1',
      domain: null,
      institutionId: 'ec1307c4-d59e-4981-b5f9-860e23229a0d',
    };

    const lowBalance: UserLogin = {
      userName: 'lowbalance@tpsmail.dev',
      password: 'password1',
      domain: null,
      institutionId: '46054f40-71fc-4d32-a8de-64b525d3ce56',
    };

    return this.authService
      .authenticateUser(gold7)
      .pipe(tap(newSessionId => DataCache.setSessionId(newSessionId)));
  }
}
