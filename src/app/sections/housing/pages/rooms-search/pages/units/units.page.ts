import { Component, ChangeDetectionStrategy, OnInit} from '@angular/core';

import { generateUnits } from '@sections/housing/unit/unit.mock';
import { RoomsStateService } from '@sections/housing/rooms/rooms-state.service';
import { FacilityToUnitsMapper, Unit } from '@sections/housing/unit/unit.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'st-units',
  templateUrl: './units.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitsPage {
  units: Unit[];
  private _unitMapper: FacilityToUnitsMapper;
  constructor(private _facilityStateService: RoomsStateService,
              private  _activeRoute: ActivatedRoute) {
    this._unitMapper = new FacilityToUnitsMapper();
  }

  ngOnInit() {
      const facilityId = parseInt(this._activeRoute.snapshot.paramMap.get('buildingKey'), 10);
      if(Number.isInteger(facilityId)) {
        this.units = this._unitMapper.map(this._facilityStateService.getParentFacilityChildren(facilityId));
      }
  }
}
