import { Injectable } from '@angular/core';

import { AuthService } from '../../service/auth-service/auth.service';
import { DataCache } from '../../utils/data-cache';
import { UserLogin } from '../../model/user';
import { testCredentials } from '../../../../environments/environment';

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
    let creds = testCredentials.gold7_Yarik;
    return this.authService
      .authenticateUser(creds)
      .pipe(tap(newSessionId => DataCache.setSessionId(newSessionId)));
  }
}
