import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable, Subscription, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HousingService } from '../../housing.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FacilitiesService } from '@sections/housing/facilities/facilities.service';

import { Unit } from '../../units-switch/units-switch.model';
import { Facility } from '@sections/housing/facilities/facilities.model';

@Component({
  selector: 'st-rooms-search',
  templateUrl: './rooms-search.page.html',
  styleUrls: ['./rooms-search.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsSearchPage {
  units: Unit[] = [
    new Unit('/housing/rooms-search/buildings', 'Buildings'),
    new Unit('/housing/rooms-search/units', 'Units'),
  ];
  roomSelectKey: number;
  parentFacilities: Facility[];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _housingService: HousingService,
    // private _facilityService: FacilitiesService,
  ) {
  }

  ngOnInit(): void {
    this.roomSelectKey = parseInt(this._route.snapshot.paramMap.get('roomSelectKey'), 10);
    console.log(this.roomSelectKey);
    this._housingService.getFacilities(this.roomSelectKey).subscribe(data => {
      console.log(data);
    }, err => {
      console.log(err);
    });
  }
}
