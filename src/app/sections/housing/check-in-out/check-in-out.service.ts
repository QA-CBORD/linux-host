import { Injectable } from "@angular/core";
import { EnvironmentFacadeService } from "@core/facades/environment/environment.facade.service";
import { HousingProxyService } from "../housing-proxy.service";
import { CheckInOutSlot } from "./check-in-out.model";
import { Response } from '@sections/housing/housing.model';
import { of, Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { isSuccessful } from "../utils/is-successful";

@Injectable({
    providedIn: 'root',
})
export class CheckInOutService {
    private _checkInOutUrl = `${
        this._environment.getHousingAPIURL()
    }/roomselectproxy/v.1.0/check-in-out/patron/spot`;

    constructor(
        private _proxy: HousingProxyService,
        private _environment: EnvironmentFacadeService) { }

    selectSpot(spot: CheckInOutSlot): Observable<boolean> {        
        return this._proxy.post<Response>(this._checkInOutUrl, spot)
            .pipe(
                map((response: Response) => {
                    if (isSuccessful(response.status)) {
                        return true;
                    } else {
                        console.log(response);
                        throw new Error(response.status.message);
                    }
                }),
                catchError(() => of(false)));
    }
}