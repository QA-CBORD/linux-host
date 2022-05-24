import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RoomsStateService } from '@sections/housing/rooms/rooms-state.service';
import { Building, FacilityToBuildingMapper } from '@sections/housing/building/building.model';
import { RoomsService } from '@sections/housing/rooms/rooms.service';

@Component({
  selector: 'st-buildings',
  templateUrl: './buildings.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuildingsPage {
  buildings: Building[];
  private _buildingMapper: FacilityToBuildingMapper;
  constructor(
    private _facilityStateService: RoomsStateService,
    private _roomsService: RoomsService) {
    this._buildingMapper = new FacilityToBuildingMapper();
  }
  ngOnInit() {
    this.buildings = this._buildingMapper.map(this._facilityStateService.getParentFacilities())
    this._roomsService.clearFilter();
    this._roomsService.clearFilterCategories();
    this._facilityStateService.clearOccupantDetails();
  }
}
