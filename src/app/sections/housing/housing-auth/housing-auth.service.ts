import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, shareReplay } from 'rxjs/operators';
import { AuthApiService } from '@core/service/auth-api/auth-api.service';


@Injectable({
  providedIn: 'root',
})
export class HousingAuthService {
  token$: Observable<string>;

  constructor(
    private _authService: AuthApiService
    ) {
    this._initToken();
  }

  private _initToken(): void {
    this.token$ = this._authService.sessionId$.pipe(
      switchMap(() => this._authService.getExternalAuthenticationToken()),
      shareReplay(1)
    );
  }
}
