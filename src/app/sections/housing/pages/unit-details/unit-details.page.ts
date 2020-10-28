import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


import { Unit } from '@sections/housing/unit/unit.model';
import {  RoomsStateService } from '@sections/housing/rooms/rooms-state.service';
import { FacilityOccupantDetails } from '@sections/housing/roommate/rooomate.model';
import { HousingService } from '@sections/housing/housing.service';


@Component({
  selector: 'st-unit-details',
  templateUrl: './unit-details.page.html',
  styleUrls: ['./unit-details.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitDetailsPage implements OnInit {

  private isExpanded = false;
  constructor(
    private _route: ActivatedRoute,
    private _stateService: RoomsStateService,
    private _housingService: HousingService
  ) {}

  unit: Unit;
  occupants: FacilityOccupantDetails[];
  ngOnInit() {
    const facilityKey = parseInt(this._route.snapshot.paramMap.get('buildingKey'), 10);
    const unitKey = parseInt(this._route.snapshot.paramMap.get('unitKey'), 10);
    this.unit = this._stateService.getUnitDetails(facilityKey, unitKey);
    if (this.roommatesExists()) {
      const activeRoomSelect = this._stateService.getActiveRoomSelect();
      this._housingService.getOccupantDetails(activeRoomSelect.key, unitKey).subscribe(
        (occupantDetails) => {
          this.occupants = occupantDetails;

      });
    }
    console.log(this.unit);
  }
  private roommatesExists() {
    return (Array.isArray(this.unit.occupantKeys) &&
    this.unit.occupantKeys.length > 0)
  }
  adjustExpander(): void {
      if (this.isExpanded) {
        this.isExpanded = false;
      } else {
        this.isExpanded = true;
      }
  }
}
