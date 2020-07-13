import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// import { AuthService } from '@core/service/auth-service/auth-api.service';

import { testCredentials } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TestProvider {
  constructor() // private authService: AuthService
  {}

  /**
   *  Get Session Info using testing user credentials in Develpment
   *  Environment Institutions
   */
  getTestUser(): Observable<string> {
    // return this.authService.authenticateUser(testCredentials.odysseyPreview);
    return of('true');
  }
}
