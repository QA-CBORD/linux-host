import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../../service/auth-service/auth.service';

import { testCredentials } from '@environments/environment';

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
    let creds = testCredentials.gold7;
    return this.authService.authenticateUser(creds);
  }
}
