import { Injectable } from '@angular/core';
import { HousingProxyService } from '@sections/housing/housing-proxy.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { isSuccessful } from '@sections/housing/utils/is-successful';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CreateContractRequestOptions } from '@sections/housing/rooms/rooms.model';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  private _roomSelectUrl = `${
    this._environment.getEnvironmentObject().housing_aws_url
  }/roomselectproxy/v.1.0/room-selects-proxy`;

  constructor(private _proxy: HousingProxyService, private _environment: EnvironmentFacadeService) {}

  postContractRequest(request: CreateContractRequestOptions): Observable<boolean> {
    const url = `${this._roomSelectUrl}/contracts/self`;

    return this._proxy.post(url, request).pipe(
      map(responseStatus => {
        if (isSuccessful(responseStatus)) {
          return true;
        } else {
          console.log(responseStatus);
          throw new Error(responseStatus.message);
        }

        return false;
      }),
      catchError(err => {
        throw err;
      })
    );
  }
}
