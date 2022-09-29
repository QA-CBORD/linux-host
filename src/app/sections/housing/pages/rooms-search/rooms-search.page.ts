import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HousingService } from '../../housing.service';
import { ActivatedRoute, Router } from '@angular/router';


import { Unit } from '../../units-switch/units-switch.model';
import { Facility } from '@sections/housing/facilities/facilities.model';
import { RoomsStateService } from '@sections/housing/rooms/rooms-state.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { PATRON_NAVIGATION } from 'src/app/app.global';
import { LOCAL_ROUTING } from '@sections/housing/housing.config';

export enum SelectedUnitsTab {
  Units,
  Buildings,
};
@Component({
  selector: 'st-rooms-search',
  templateUrl: './rooms-search.page.html',
  styleUrls: ['./rooms-search.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsSearchPage {
  units: Unit[];
  roomSelectKey: number;
  parentFacilities: Facility[];
  private previousTab: SelectedUnitsTab;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _housingService: HousingService,
    private _facilityStateService: RoomsStateService,
    private _loadingService: LoadingService,
  ) {
  }

  ngOnInit(): void {
    this.roomSelectKey = parseInt(this._route.snapshot.params.roomSelectKey);
    this._loadingService.showSpinner();
    this._housingService.getFacilities(this.roomSelectKey).subscribe({
      next: async (data) => {
           this._facilityStateService.createFacilityDictionary(data);
           this.parentFacilities = this._facilityStateService.getParentFacilities();
           await this._router.navigate([`${PATRON_NAVIGATION.housing}/${LOCAL_ROUTING.roomsSearch}/${this.roomSelectKey}`, 'buildings']);
           this._loadingService.closeSpinner();
      },
      error: () => this._loadingService.closeSpinner(),
    });
  }

  async changeView(view: SelectedUnitsTab) {
    if (view == SelectedUnitsTab.Buildings) {
      console.log("changeView building")
     // if (!this._router.url.includes("buildings")) {
        await this._router.navigate([`${PATRON_NAVIGATION.housing}/${LOCAL_ROUTING.roomsSearch}/${this.roomSelectKey}`, 'buildings']);
     // }
    }  else if (view == SelectedUnitsTab.Units){
      console.log("changeView units")
      if (!this._router.url.includes("units")) {
        await this._router.navigate([`${PATRON_NAVIGATION.housing}/${LOCAL_ROUTING.roomsSearch}/${this.roomSelectKey}`, 'units']);
      }
    }
  }
}
