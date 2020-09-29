import { Injectable } from '@angular/core';

import { RoomSelect } from './rooms.model';
import { Facility } from '@sections/housing/facilities/facilities.model';
import { Observable } from 'rxjs';


export interface StateService<K, V> {
  entityDictionary: Map<K, V>
}

@Injectable({
  providedIn: 'root',
})
export class RoomsStateService implements StateService<number, Facility[]> {
  entityDictionary: Map<number, Facility[]>;
  private roomSelects: Observable<RoomSelect[]>;
  private _parentFacilities: Facility[];
  constructor() {
    this.entityDictionary = new Map<number, Facility[]>()
  }
  setRoomSelects(value: Observable<RoomSelect[]>) {
    this.roomSelects = value;
  }

  getRoomSelects() {
    return this.roomSelects;
  }

  storeParentFacilities(facilities: Facility[]) {
    this._parentFacilities = RoomsStateService._findParents(facilities);
  }

  getParentFacilities() {
    return this._parentFacilities;
  }

  getParentFacilityChildren(facilityId: number) {
    return this.entityDictionary.get(facilityId);
  }

  createFacilityDictionary(facilities: Facility[]): void {
    this._parentFacilities = RoomsStateService._findParents(facilities);
    this._addChildrenToDictionary(facilities);
  }

  private static _findParents(facilities: Facility[]): Facility[] {
    return facilities.filter(facility => {
      if (facility.isTopLevel) {
        return facility;
      }
    });
  }

  private _addChildrenToDictionary(facilities: Facility[]): void {
    this._parentFacilities.forEach(parent => {
      const children = facilities.filter(facility =>
        (
          facility.topLevelKey === parent.facilityId &&
          !facility.isTopLevel
        ),
      );
      if (children.length > 0) {
        this.entityDictionary.set(parent.facilityId, children);
      }
    });
  }
}
