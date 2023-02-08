import { Injectable } from '@angular/core';
import { Facility } from '@sections/housing/facilities/facilities.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Unit } from '@sections/housing/unit/unit.model';
import { FacilityOccupantDetails } from '@sections/housing/roommate/roommate.model';
import { OccupantAttribute } from '@sections/housing/attributes/attributes.model';
import { hasValue, isDefined } from '@sections/housing/utils';
import { map } from 'rxjs/operators';
import { RoomSelect } from './rooms.model';


export interface StateService<K, V> {
  entityDictionary: Map<K, V>
}

@Injectable({
  providedIn: 'root',
})
export class RoomsStateService implements StateService<number, Facility[]> {
  entityDictionary: Map<number, Facility[]>;
  private _occupantDictionary: Map<number, FacilityOccupantDetails[]>;
  private roomSelects: BehaviorSubject<RoomSelect[]> = new BehaviorSubject<RoomSelect[]>([]);
  private _currentlySelectedRoomSelect: RoomSelect;
  private _parentFacilities: Facility[];
  private _activeFilterFacilities: Facility[] = null;
  private _activeFacilities$: BehaviorSubject<Facility[]> = new BehaviorSubject<Facility[]>([]);
  constructor() {
    this.entityDictionary = new Map<number, Facility[]>();
    this._occupantDictionary = new Map<number, FacilityOccupantDetails[]>();
  }


  setRoomSelects(value: RoomSelect[]) {
    this.roomSelects.next(value);
  }
  setOccupantDetails(facilityOccupants: FacilityOccupantDetails[]): void {
    const occupantFacilities = this._findOccupantFacilities();
    occupantFacilities.forEach(facility => {
      const occupantKeys: number[] = facilityOccupants.map(x => x.patronKey);
      const facilityOccupantKeys = facility.occupantKeys;
      const occupantDetails: FacilityOccupantDetails[] = [];
      facilityOccupantKeys.forEach(occupantKey => {
        const index = occupantKeys.indexOf(occupantKey);
        if (index >= 0) {
          occupantDetails.push(facilityOccupants[index]);
        }
      })
      this._occupantDictionary.set(facility.facilityId, occupantDetails);
    });
  }
  clearOccupantDetails(): void {
    this._occupantDictionary.clear();
  }
  getFacilities$(): Observable<Facility[]> {
    return this._activeFacilities$.asObservable();
  }

  setFacilities$(parentKey?: number ): void {
    if(!parentKey) {
      this._activeFacilities$.next(this.getActiveFilterFacilities());
    } else {
      this._activeFacilities$.next(this.getParentFacilityChildren(parentKey));
    }
  }
  readonly roomSelects$: Observable<RoomSelect[]> = this.roomSelects.asObservable();


  getOccupantDetails(facilityKey: number): FacilityOccupantDetails[] {
    return  this._occupantDictionary.get(facilityKey) || [];
  }
  getOccupiedFacilities(): Facility[] {
    return  this._findOccupantFacilities();
  }
  getAllOccupantAttributes(): OccupantAttribute[] {
    const attributes: OccupantAttribute[] = [];
    this._occupantDictionary.forEach(occupantDetails => {
      occupantDetails.forEach(occupant => {
        occupant.attributes.forEach(attribute => {
          if(!this._hasAttribute(attributes, attribute)) {
              attributes.push(attribute)
          } else {
            if(this._isNewAttributeValue(attributes, attribute)) {
              attributes.push(attribute);
            }
          }
        })
      })
    });

    return  attributes;
  }

  private _isNewAttributeValue(attributes: OccupantAttribute[], attribute: OccupantAttribute): boolean {
    const matchedAttributes = attributes.filter(x => x.attributeConsumerKey === attribute.attributeConsumerKey);
    const currentValues = matchedAttributes.map(x => x.value);
    return (isDefined(attribute.value) && hasValue(attribute.value)
      && !currentValues.includes(attribute.value));
  }

  private  _hasAttribute(attributes: OccupantAttribute[], attribute: OccupantAttribute): boolean {
    return !!(attributes.find(x => x.name === attribute.name ))
  }

  private _findOccupantFacilities(): Facility[] {
    const occupantFacilities: Facility[] = [];

    const parentFacilities = this.getParentFacilities();
    parentFacilities.forEach(parent => {
        const children =  this.getParentFacilityChildren(parent.facilityId);
        children.forEach(facility => {
          if(facility.occupantKeys && facility.occupantKeys.length > 0) {
            occupantFacilities.push(facility);
          }
        })
    })
    return occupantFacilities;
  }

  setActiveRoomSelect(roomSelectKey: number): void {
    this.roomSelects.subscribe(arr => {
      this._currentlySelectedRoomSelect = arr.find(roomSelect => roomSelect.key == roomSelectKey);
    });
  }

  getActiveRoomSelect(): RoomSelect {
    return this._currentlySelectedRoomSelect;
  }

  isFilterActive(): boolean {
    return  (this._activeFilterFacilities && this._activeFilterFacilities.length > 0);
  }

  updateActiveFilterFacilities(facilities: Facility[]) {
    this._activeFilterFacilities = facilities;
    this.setFacilities$();
    }

  getActiveFilterFacilities(): Facility[] {
    return this._activeFilterFacilities;
  }

  getRoomSelects(): Observable<RoomSelect[]> {
    return this.roomSelects.pipe(
      map((data) => data.map(
        x => x))
    );
  }

  storeParentFacilities(facilities: Facility[]) {
    this._parentFacilities = RoomsStateService._findParents(facilities);
  }

  getParentFacilities() {
    return this._parentFacilities;
  }

  getUnitDetails(parentFacilityKey: number, unitKey: number) {
    const childrenFacilities = this.entityDictionary.get(parentFacilityKey);
    const facility = childrenFacilities.find(child => child.facilityId == unitKey);

    return new Unit({
      facilityKey: facility.facilityId,
      parentKey: facility.topLevelKey,
      title: `${facility.facilityName}`,
      isFavorite: false,
      labels: facility.attributes.map(x => x.value),
      attributes: facility.attributes,
      occupantKeys: facility.occupantKeys
    });
  }

  getParentFacilityChildren(facilityId: number) {
    return this.entityDictionary.get(facilityId);
  }

  getAllFacilityChildren(): Facility[] {
    let childrenFacilities: Facility[] = [];
    this._parentFacilities.forEach(parent => {
      childrenFacilities = childrenFacilities.concat(this.entityDictionary.get(parent.facilityId));
    });
    return childrenFacilities;
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
      let children = facilities.filter(facility =>
        (
          facility.topLevelKey === parent.facilityId &&
          !facility.isTopLevel
        ),
      );
      children = this._updateChildren(children, parent.facilityName);

      if (children.length > 0) {
        this.entityDictionary.set(parent.facilityId, children);
      }
    });
  }

  private _updateChildren(children: Facility[], parentName: string):Facility[] {
    const updatedChildren = this._updateTopLevelName(children, parentName);
    const facilityChildren = this._updateFullName(updatedChildren);
    return facilityChildren;
  }

  private _updateFullName(children: Facility[]): Facility[] {
    children.forEach(x => {
      const fullName = x.getAttributeValue('Full Name').value;
      x.facilityName = fullName
    })
    return  children;
  }
  private _updateTopLevelName(children: Facility[] , parentName): Facility[] {
    return children.map(x => {
      x.facilityName = `${parentName} \u{2014} ${x.facilityName}`;
      x.topLevelName = parentName;
      return x;
    })
  }
}
