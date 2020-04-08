import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '@core/service/auth-service/auth.service';

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
    return this.authService.authenticateUser(testCredentials.odysseyPreview);
  }
}
