import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { RoomsStateService } from '@sections/housing/rooms/rooms-state.service';
import { FacilityToUnitsMapper, Unit } from '@sections/housing/unit/unit.model';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'st-units',
  templateUrl: './units.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitsPage implements OnInit {
  units$: Observable<Unit[]>;
  private _unitMapper: FacilityToUnitsMapper;
  constructor(private _facilityStateService: RoomsStateService, private _activeRoute: ActivatedRoute) {
    this._unitMapper = new FacilityToUnitsMapper();
  }

  ngOnInit() {
    const facilityId = parseInt(this._activeRoute.snapshot.params.buildingKey);
    const allUnits = this._activeRoute.snapshot.queryParams.allUnits;
    if (facilityId) {
      this._facilityStateService.setFacilities$(facilityId);
    }

    if (allUnits) {
      this._facilityStateService.updateActiveFilterFacilities(this._facilityStateService.getAllFacilityChildren());
    }

    this.units$ = this._facilityStateService.getFacilities$().pipe(map(data => this._unitMapper.map(data)));
  }
}
