import { Injectable } from '@angular/core';

import { DataCache } from '../../utils/data-cache';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { testCredentials } from '@environments/environment';
import { AuthService } from '@core/service/auth-service/auth.service';

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
    let creds = testCredentials.odysseyPreview;
    return this.authService
      .authenticateUser(creds)
      .pipe(tap(newSessionId => DataCache.setSessionId(newSessionId)));
  }
}
