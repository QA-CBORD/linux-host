import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HousingService } from '../../housing.service';
import { ActivatedRoute, Router } from '@angular/router';


import { Unit } from '../../units-switch/units-switch.model';
import { Facility } from '@sections/housing/facilities/facilities.model';
import { RoomsStateService } from '@sections/housing/rooms/rooms-state.service';
import { LoadingService } from '@core/service/loading/loading.service';

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

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _housingService: HousingService,
    private _facilityStateService: RoomsStateService,
    private _loadingService: LoadingService
  ) {
  }

  ngOnInit(): void {
    this.roomSelectKey = parseInt(this._route.snapshot.paramMap.get('roomSelectKey'), 10);
    this.units = [
      new Unit('buildings', 'Buildings'),
      new Unit(`units`, 'Units'),
    ];
    this._loadingService.showSpinner();
    this._housingService.getFacilities(this.roomSelectKey).subscribe(data => {
      this._facilityStateService.createFacilityDictionary(data);
      this.parentFacilities = this._facilityStateService.getParentFacilities();
      //this._router.navigate(['buildings'], {relativeTo: this._route});
      this._loadingService.closeSpinner();
    }, err => {
      this._loadingService.closeSpinner();
    });
  }

  public changeView(view: SelectedUnitsTab) {
    console.log("changeview", view)
    if (view == SelectedUnitsTab.Buildings) {
      this._router.navigate(['buildings'], {relativeTo: this._route});
    }  else {
      this._router.navigate(['units'], {relativeTo: this._route});
    }
   // this._selectedHousingTab = view;
  }
}
