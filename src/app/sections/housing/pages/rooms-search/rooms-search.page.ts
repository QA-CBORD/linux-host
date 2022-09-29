import { Component, ChangeDetectionStrategy, NgZone } from '@angular/core';
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
  //changeDetection: ChangeDetectionStrategy.OnPush,
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
    private _loadingService: LoadingService,
    private readonly ngZone: NgZone
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
      this._router.navigate(['buildings'], {relativeTo: this._route});
      this._loadingService.closeSpinner();
    }, err => {
      this._loadingService.closeSpinner();
    });
  }

  public changeView(view: SelectedUnitsTab) {
    console.log("changeview", view)
    const buildingKey = 311
    if (view == SelectedUnitsTab.Buildings) {
      this.ngZone.run(async() => {
        const nav = await this._router.navigate([`${PATRON_NAVIGATION.housing}/${LOCAL_ROUTING.roomsSearch}/28`, 'buildings']);
        console.log("nav: ", nav)
        console.log("building relative: ", this._route)
      })

    }  else {

      this.ngZone.run(async() => {
        const nav = await  this._router.navigate([`${PATRON_NAVIGATION.housing}/${LOCAL_ROUTING.roomsSearch}/28`, 'units', buildingKey]);
        console.log("nav: ", nav)
        console.log("units relative: ", this._route)
      })
      // this._router.navigate(['units', buildingKey], {relativeTo: this._route});
    }
   // this._selectedHousingTab = view;
  }
}
