import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { generateBuildings } from '@sections/housing/building/building.mock';
import { RoomsStateService } from '@sections/housing/rooms/rooms-state.service';
import { Building, FacilityToBuildingMapper } from '@sections/housing/building/building.model';

@Component({
  selector: 'st-buildings',
  templateUrl: './buildings.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuildingsPage {
  buildings: Building[];
  private _buildingMapper: FacilityToBuildingMapper;
  constructor(private _facilityStateService: RoomsStateService) {
    this._buildingMapper = new FacilityToBuildingMapper();
  }
  ngOnInit() {
    console.log('buildings loaded');
    console.log(this._facilityStateService.getParentFacilities());
    this.buildings = this._buildingMapper.map(this._facilityStateService.getParentFacilities())
  }
}
