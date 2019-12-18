import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AuthService } from '../../../core/service/auth-service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class HousingAuthService {
  constructor(private _authService: AuthService) {}

  authorize(): Observable<string> {
    return this._authService.sessionId$.pipe(switchMap(() => this._authService.getExternalAuthenticationToken()));
  }
}
