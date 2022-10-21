import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HousingService } from '../../housing.service';
import { ActivatedRoute, Router } from '@angular/router';


import { Unit } from '../../units-switch/units-switch.model';
import { Facility } from '@sections/housing/facilities/facilities.model';
import { RoomsStateService } from '@sections/housing/rooms/rooms-state.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { PATRON_NAVIGATION } from 'src/app/app.global';
import { LOCAL_ROUTING } from '@sections/housing/housing.config';
import { UnitsType } from './pages/buildings/buildings.page';
import { Subscription } from 'rxjs';

export enum SelectedUnitsTab {
  Buildings = 'Buildings',
  Units = 'Units',
}
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
  subscriber: Subscription;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _housingService: HousingService,
    private _facilityStateService: RoomsStateService,
    private _loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this._loadingService.showSpinner();
    this.roomSelectKey = parseInt(this._route.snapshot.params.roomSelectKey);
    this.subscriber = this._housingService.getFacilities(this.roomSelectKey).subscribe({
      next: data => {
        this._loadingService.showSpinner();
        this._facilityStateService.createFacilityDictionary(data);
        this.parentFacilities = this._facilityStateService.getParentFacilities();
        this.goToBuildings();
        this._loadingService.closeSpinner();
      },
      error: () => this._loadingService.closeSpinner(),
    });
  }

  async changeView(view: SelectedUnitsTab) {
    if (view == SelectedUnitsTab.Buildings) {
      this.goToBuildings();
    } else if (view == SelectedUnitsTab.Units) {
      this.goToUnits();
    }
  }

  private async goToUnits() {
    if (!this._router.url.includes(UnitsType.Rooms)) {
      this._loadingService.showSpinner();
      this._router.navigate(
        [`${PATRON_NAVIGATION.housing}/${LOCAL_ROUTING.roomsSearch}/${this.roomSelectKey}`, UnitsType.Rooms],
        { queryParams: { allUnits: true } }
      );
      this._loadingService.closeSpinner();
    }
  }

  private goToBuildings() {
    if (!this._router.url.includes(UnitsType.Buildings)) {
      this._loadingService.showSpinner();
      this._router.navigate([
        `${PATRON_NAVIGATION.housing}/${LOCAL_ROUTING.roomsSearch}/${this.roomSelectKey}`,
        UnitsType.Buildings,
      ]);
      this._loadingService.closeSpinner();
    }
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }
}
