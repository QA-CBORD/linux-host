import { Injectable } from '@angular/core';
import { HousingProxyService } from '@sections/housing/housing-proxy.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { isSuccessful } from '@sections/housing/utils/is-successful';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CreateContractRequestOptions } from '@sections/housing/rooms/rooms.model';
import { TermsService } from '@sections/housing/terms/terms.service';
import { Category } from '@sections/housing/search-filter/filter-sort/filter-sort.model';
import { Facility } from '@sections/housing/facilities/facilities.model';
import { RoomsStateService } from '@sections/housing/rooms/rooms-state.service';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  private _roomSelectUrl = `${
    this._environment.getEnvironmentObject().housing_aws_url
  }/roomselectproxy/v.1.0/room-selects-proxy`;

  constructor(private  _stateService: RoomsStateService,
              private _proxy: HousingProxyService,
              private _environment: EnvironmentFacadeService) {}

  postContractRequest(request: CreateContractRequestOptions): Observable<boolean> {
    const url = `${this._roomSelectUrl}/contracts/self`;

    return this._proxy.post(url, request).pipe(
      map(response => {
        if (isSuccessful(response.status)) {
          return true;
        } else {
          console.log(response);
          throw new Error(response.status.message);
        }

        return false;
      }),
      catchError(err => {
        throw err;
      })
    );
  }

  _createFilterCategory(name: string, attributeKey: number): Category {
    return new Category(name, attributeKey);
  }

  _getFacilityAttributeCategories(): Category[] {
    let childrenFacilities: Facility[];
    const parentFacilities = this._stateService.getParentFacilities();
    let facilityOptions: Category[];
    parentFacilities.forEach( parent => {
      childrenFacilities = childrenFacilities.concat(this._stateService.getParentFacilityChildren(parent.facilityId));
    });
    childrenFacilities.forEach(facility => {
      let encounteredOptions: string[];
      facility.attributes.forEach(attrib => {
        if(!encounteredOptions.includes(attrib.name)) {
          encounteredOptions.push(attrib.name);
          facilityOptions.push(this._createFilterCategory(`Facility ${attrib.name}`, Number.parseInt(attrib.value, 10)));
        }
      })
    })
    return [new Category('123',1)];
  }
  getFilterCategories(): Category[] {
    let filterCategories: Category[];
    filterCategories.push(this._createFilterCategory('Buildings', -1));
    filterCategories = filterCategories.concat(this._getFacilityAttributeCategories());
    // #TODO  implement grabbing patron attributes and creating categories based on occupant attributes.
    return filterCategories;
  }
}
