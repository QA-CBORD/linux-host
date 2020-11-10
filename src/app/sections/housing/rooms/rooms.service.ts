import { Injectable } from '@angular/core';
import { HousingProxyService } from '@sections/housing/housing-proxy.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { isSuccessful } from '@sections/housing/utils/is-successful';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CreateContractRequestOptions } from '@sections/housing/rooms/rooms.model';
import { Category, CategoryOptions } from '@sections/housing/search-filter/filter-sort/filter-sort.model';
import { Facility, FacilityAttribute } from '@sections/housing/facilities/facilities.model';
import { RoomsStateService } from '@sections/housing/rooms/rooms-state.service';
import { isDefined } from '@sections/housing/utils';
import { Response } from '@sections/housing/housing.model';
import { OccupantAttribute } from '@sections/housing/attributes/attributes.model';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  private _roomSelectUrl = `${
    this._environment.getEnvironmentObject().housing_aws_url
  }/roomselectproxy/v.1.0/room-selects-proxy`;

  private _filterOptions: CategoryOptions

  constructor(
    private _stateService: RoomsStateService,
    private _proxy: HousingProxyService,
    private _environment: EnvironmentFacadeService
  ) {
      this._filterOptions = new CategoryOptions();
    }

  public postContractRequest(request: CreateContractRequestOptions): Observable<boolean> {
    const url = `${this._roomSelectUrl}/contracts/self`;

    return this._proxy.post<Response>(url, request).pipe(
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

  private _createFilterCategory(name: string, attributeKey: number): Category {
    return new Category(name, attributeKey);
  }

  private _getPatronAttributeCategories(): Category[] {
    const patronAttributes: OccupantAttribute[] = this._stateService.getAllOccupantAttributes();
    const patronOptions: Category[] = [];
    const encounteredOptions: Category[] = [];
    patronAttributes.forEach(attribute => {
      if(!this._attributeExists(encounteredOptions, attribute)) {
        const newCategory = this._createFilterCategory(`Patron ${attribute.name}`,
          attribute.attributeConsumerKey);
        encounteredOptions.push(newCategory);
        patronOptions.push(newCategory);
      }
    });
    return  patronOptions;
  }

  private _getFacilityAttributeCategories(): Category[] {
    let childrenFacilities: Facility[] = [];
    const parentFacilities = this._stateService.getParentFacilities();
    let facilityOptions: Category[] = [];
    let encounteredOptions: Category[] = [];

    parentFacilities.forEach(parent => {
      childrenFacilities = childrenFacilities.concat(this._stateService.getParentFacilityChildren(parent.facilityId));
    });
    childrenFacilities.forEach(facility => {
      facility.attributes.forEach(attrib => {
        if (!this._attributeExists(encounteredOptions, attrib)) {
          const newCategory = this._createFilterCategory(`Facility ${attrib.name}`,
            attrib.attributeConsumerKey);
          encounteredOptions.push(newCategory);
          facilityOptions.push(newCategory);
        }
      });
    });
    return facilityOptions;
  }
  private _attributeExists(encounteredOptions: Category[], attribute: FacilityAttribute | OccupantAttribute): boolean {
    return !!encounteredOptions.find(x => x.attributeKey === attribute.attributeConsumerKey);
  }

  public getFilterOptions(categories: Category[]): {[key: string]: string[]} {
    this._createFacilityFilterOptions(categories);
    this._createPatronFilterOptions(categories);

    return this._filterOptions.getCategoryOptions();
  }

  private _createPatronFilterOptions(categories: Category[]): void {
      const patronAttributes = this._stateService.getAllOccupantAttributes();
      patronAttributes.forEach(attrib => {
        this._filterOptions.addOption(`Patron ${attrib.name}`, attrib.value);
      })
  }

  private _createFacilityFilterOptions(categories: Category[]): void {
    const parentFacilities = this._stateService.getParentFacilities();
    let facilityChildren = [];
    parentFacilities.forEach(parent => {
      facilityChildren = facilityChildren.concat(this._stateService.getParentFacilityChildren(parent.facilityId));
    });
    this._filterOptions.addBuildingOptions(parentFacilities);
    facilityChildren.forEach((child: Facility) => {
      const filteredAttributes: FacilityAttribute[] = this._filterAttributeCategories(categories, child.attributes);
      if(filteredAttributes) {
        filteredAttributes.forEach(attrib => {
          if (isDefined(attrib.value)) {
            this._filterOptions.addOption(`Facility ${attrib.name}`, attrib.value);
          }
        });
      }
    });
  }
  private _filterAttributeCategories(categories:Category[], attributes: FacilityAttribute[]): FacilityAttribute[] {
    const filteredAttributes = attributes.filter(
      attrib => categories.find(
        (x) => x.attributeKey === attrib.attributeConsumerKey));

    return filteredAttributes;
  }
  public getFilterCategories(): Category[] {
    let filterCategories: Category[] = [];
    filterCategories.push(this._createFilterCategory('Buildings', -777));
    filterCategories = filterCategories.concat(this._getFacilityAttributeCategories());
    // #TODO  implement grabbing patron attributes and creating categories based on occupant attributes.
    filterCategories.concat(this._getPatronAttributeCategories());

    return filterCategories;
  }
}
