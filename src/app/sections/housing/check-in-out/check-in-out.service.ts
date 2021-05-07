import { Injectable } from "@angular/core";
import { EnvironmentFacadeService } from "@core/facades/environment/environment.facade.service";
import { HousingProxyService } from "../housing-proxy.service";
import { CheckInOutStateService } from "./check-in-out-state.service";
import { CheckInOutSlot } from "./check-in-out.model";
import { Response } from '@sections/housing/housing.model';
import { of, Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class CheckInOutService {
    private _checkInOutUrl = `${
        this._environment.getHousingAPIURL()
    }/roomselectproxy/v.1.0/check-in-out`;

    constructor(
        private _stateService: CheckInOutStateService,
        private _proxy: HousingProxyService,
        private _environment: EnvironmentFacadeService) { }

    selectSpot(spot: CheckInOutSlot): Observable<boolean> {
        console.log('selection is OK');
        
        return of(true);
    }
}