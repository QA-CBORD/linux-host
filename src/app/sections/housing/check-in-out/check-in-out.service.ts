import { Injectable } from "@angular/core";
import { EnvironmentFacadeService } from "@core/facades/environment/environment.facade.service";
import { HousingProxyService } from "../housing-proxy.service";
import { CheckInOutStateService } from "./check-in-out-state.service";

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
        private _environment: EnvironmentFacadeService)
    {
          // this._filterOptions = new CategoryOptions();
    }

}