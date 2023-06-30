import { Injectable } from '@angular/core';
import { HousingProxyService } from '@sections/housing/housing-proxy.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { isSuccessful } from '@sections/housing/utils/is-successful';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CreateContractRequestOptions } from '@sections/housing/rooms/rooms.model';
import {
  Category,
  CategoryOptionDetail,
  CategoryOptions,
} from '@sections/housing/search-filter/filter-sort/filter-sort.model';
import { Facility, FacilityAttribute } from '@sections/housing/facilities/facilities.model';
import { RoomsStateService } from '@sections/housing/rooms/rooms-state.service';
import { hasValue, isDefined } from '@sections/housing/utils';
import { Response } from '@sections/housing/housing.model';
import { OccupantAttribute } from '@sections/housing/attributes/attributes.model';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  private _roomSelectUrl = `${this._environment.getHousingAPIURL()}/roomselectproxy/v.1.0/room-selects-proxy`;

  private _filterOptions: CategoryOptions;

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
          throw new Error(response.status.message);
        }
      }),
      catchError(() => of(false))
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
      if (!this._attributeExists(encounteredOptions, attribute)) {
        const newCategory = this._createFilterCategory(`Patron ${attribute.name}`, attribute.attributeConsumerKey);
        encounteredOptions.push(newCategory);
        patronOptions.push(newCategory);
      }
    });
    return patronOptions;
  }

  private _getFacilityAttributeCategories(): Category[] {
    let childrenFacilities: Facility[] = [];
    const parentFacilities = this._stateService.getParentFacilities();
    const facilityOptions: Category[] = [];
    const encounteredOptions: Category[] = [];

    parentFacilities.forEach(parent => {
      childrenFacilities = childrenFacilities.concat(this._stateService.getParentFacilityChildren(parent.facilityId));
    });

    childrenFacilities.forEach(facility => {
      if (facility) {
        facility.attributes.forEach(attrib => {
          if (!this._attributeExists(encounteredOptions, attrib) && this._isAttributeAllowedForCategory(attrib)) {
            const newCategory = this._createFilterCategory(`Facility ${attrib.name}`, attrib.attributeConsumerKey);
            encounteredOptions.push(newCategory);
            facilityOptions.push(newCategory);
          }
        });
      }
    });
    return facilityOptions;
  }

  private _isAttributeAllowedForCategory(attribute: FacilityAttribute): boolean {
    return hasValue(attribute.name) ? attribute.name !== 'Full Name' : false;
  }

  private _attributeExists(encounteredOptions: Category[], attribute: FacilityAttribute | OccupantAttribute): boolean {
    return !!encounteredOptions.find(x => x.attributeKey === attribute.attributeConsumerKey);
  }

  public getFilterOptions(categories: Category[]): { [key: string]: string[] } {
    this._createFacilityFilterOptions(categories);
    this._createPatronFilterOptions();

    return this._filterOptions.getCategoryOptions();
  }

  private _createPatronFilterOptions(): void {
    const patronAttributes = this._stateService.getAllOccupantAttributes();
    patronAttributes.forEach(attrib => {
      this._filterOptions.addOption(`Patron ${attrib.name}`, attrib.value);
    });
  }

  private _createFacilityFilterOptions(categories: Category[]): void {
    const parentFacilities = this._stateService.getParentFacilities();
    let facilityChildren = [];
    parentFacilities.forEach(parent => {
      facilityChildren = facilityChildren.concat(this._stateService.getParentFacilityChildren(parent.facilityId));
    });
    this._filterOptions.addBuildingOptions(parentFacilities);
    facilityChildren.forEach((child: Facility) => {
      if (child) {
        const filteredAttributes: FacilityAttribute[] = this._filterAttributeCategories(categories, child.attributes);
        if (filteredAttributes) {
          filteredAttributes.forEach(attrib => {
            if (isDefined(attrib.value)) {
              this._filterOptions.addOption(`Facility ${attrib.name}`, attrib.value);
            }
          });
        }
      }
    });
  }
  private _filterAttributeCategories(categories: Category[], attributes: FacilityAttribute[]): FacilityAttribute[] {
    return attributes.filter(attrib => categories.find(x => x.attributeKey === attrib.attributeConsumerKey));
  }
  public getFilterCategories(): Category[] {
    let filterCategories: Category[] = [];
    filterCategories.push(this._createFilterCategory('Buildings', -777));

    filterCategories = filterCategories.concat(this._getFacilityAttributeCategories());

    filterCategories = filterCategories.concat(this._getPatronAttributeCategories());

    return filterCategories;
  }

  public clearFilterCategories(): void {
    this._filterOptions.removeAll();
  }

  public getAttributeOptionsInfo(category, options: string[]): CategoryOptionDetail[] {
    return options.map(x => this._filterOptions.getOptionDetails(category, x));
  }

  public getAttributeOptionInfo(category: string, option: string): CategoryOptionDetail {
    return this._filterOptions.getOptionDetails(category, option);
  }
  public clearFilter(): void {
    this._stateService.updateActiveFilterFacilities([]);
    this._filterOptions.updateOptionDetails('', []);
  }
  public filterBuildings(filterOptions: Map<string, string[]>, wasOccupantOptionSelected: boolean): void {
    const facilities = this._stateService.getAllFacilityChildren();
    let filteredFacilities = [];
    let parentKeys: number[] = [];
    if (this._isBuildingFiltered(filterOptions)) {
      const parenFacilities = this._stateService.getParentFacilities();
      parentKeys = parenFacilities
        .filter(x => filterOptions.get('Buildings').includes(x.facilityName))
        .map(y => y.facilityId);
    }
    filterOptions.forEach((options, category) => {
      if (category === 'Buildings') {
        return true;
      }
      facilities.forEach(facility => {
        if (this.matchFacilityAttributes(category, options, facility, filteredFacilities, parentKeys)) {
          filteredFacilities.push(facility);
        }
        if (wasOccupantOptionSelected && facility.occupantKeys.length > 0) {
          this.filterFacilityByOccupantsCriteria(category, options, facility, filteredFacilities, parentKeys);
        }
      });
    });

    if (this._isMultipleCategories(filterOptions)) {
      filteredFacilities = filteredFacilities.filter(x => this._matchAllAttributes(filterOptions, x));
    }

    this._updateFilter(filterOptions);
    this._stateService.updateActiveFilterFacilities(filteredFacilities);
  }

  private filterFacilityByOccupantsCriteria(
    category: string,
    options: string[],
    facility: Facility,
    filteredFacilities: Facility[],
    parentKeys: number[]
  ) {
    if (this.matchOccupantsAttributes(category, options, facility, filteredFacilities, parentKeys)) {
      filteredFacilities.push(facility);
    }
  }

  private matchOccupantsAttributes(
    category: string,
    options: string[],
    facility: Facility,
    filteredFacilities: Facility[],
    parentKeys: number[]
  ) {
    return (
      this._matchedOccupantsAttributes(category, options, facility.facilityId) &&
      !this._hasBuilding(filteredFacilities, facility) &&
      this._matchedBuildingRequirements(facility, parentKeys)
    );
  }

  private matchFacilityAttributes(
    category: string,
    options: string[],
    facility: Facility,
    filteredFacilities: Facility[],
    parentKeys: number[]
  ) {
    return (
      this._matchedFacilityAttributes(category, options, facility) &&
      !this._hasBuilding(filteredFacilities, facility) &&
      this._matchedBuildingRequirements(facility, parentKeys)
    );
  }

  private _isMultipleCategories(filterOptions: Map<string, string[]>): boolean {
    return filterOptions.size > 1;
  }

  private _isBuildingFiltered(filterOptions: Map<string, string[]>): boolean {
    return filterOptions.has('Buildings');
  }

  private _hasBuilding(listOfFacilities: Facility[], building: Facility): boolean {
    return !!listOfFacilities.find(x => x.facilityId === building.facilityId);
  }

  private _updateFilter(filterOptions: Map<string, string[]>): void {
    const includedCategories: string[] = [];
    filterOptions.forEach((options, category) => {
      includedCategories.push(category);
      this._filterOptions.updateOptionDetails(category, options);
    });
    this._filterOptions.deselectOptionDetails(includedCategories);
  }
  private _matchedBuildingRequirements(facility: Facility, parentKeys: number[]): boolean {
    return parentKeys.length > 0 ? parentKeys.includes(facility.topLevelKey) : true;
  }

  private _matchAllAttributes(filterOptions: Map<string, string[]>, facility: Facility): boolean {
    let matchesAll = true;
    for (const [category, options] of filterOptions) {
      if (category === 'Buildings') {
        continue;
      }
      if (category.includes('Facility ')) {
        if (this._matchedFacilityAttributes(category, options, facility)) {
          continue;
        } else {
          matchesAll = false;
          break;
        }
      } else {
        if (this._hasOccupants(facility) && this._matchedOccupantsAttributes(category, options, facility.facilityId)) {
          continue;
        } else {
          matchesAll = false;
          break;
        }
      }
    }

    return matchesAll;
  }

  private _matchedFacilityAttributes(category: string, options: string[], facility: Facility): boolean {
    return (
      facility.hasAttribute(category.replace('Facility ', '')) &&
      this._valueMatches(options, facility.getAttributeValue(category.replace('Facility ', '')).value)
    );
  }

  private _matchedOccupantsAttributes(category: string, options: string[], facilityId: number): boolean {
    const occupantDetails = this._stateService.getOccupantDetails(facilityId);
    const occupant = occupantDetails.find(x => x.hasAttribute(category.replace('Patron ', '')));

    return occupant ? this._valueMatches(options, occupant.getAttributeValue(category.replace('Patron ', ''))) : false;
  }

  private _hasOccupants(facility: Facility): boolean {
    return facility.occupantKeys && facility.occupantKeys.length > 0;
  }

  private _valueMatches(options: string[], value: string): boolean {
    return options.includes(value);
  }
}
