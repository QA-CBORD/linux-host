import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable, Subscription, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HousingService } from '../../housing.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FacilitiesService } from '@sections/housing/facilities/facilities.service';


import { Unit } from '../../units-switch/units-switch.model';
import { Facility } from '@sections/housing/facilities/facilities.model';
import { RoomsStateService } from '@sections/housing/rooms/rooms-state.service';
import { LoadingService } from '@core/service/loading/loading.service';

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
      new Unit(`/housing/rooms-search/${this.roomSelectKey}/buildings`, 'Buildings'),
      new Unit(`/housing/rooms-search/${this.roomSelectKey}/units`, 'Units'),
    ];
    this._loadingService.showSpinner();
    this._housingService.getFacilities(this.roomSelectKey).subscribe(data => {
      this._facilityStateService.createFacilityDictionary(data);
      this.parentFacilities = this._facilityStateService.getParentFacilities();
      this._router.navigate(['buildings'], {relativeTo: this._route});
      this._loadingService.closeSpinner();
    }, err => {
      this._loadingService.closeSpinner();
      console.log(err);
    });
  }
}