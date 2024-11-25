import { ChangeDetectionStrategy, Component, ViewChild, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';

import { FilterSortComponent } from '../filter-sort/filter-sort.component';

import { Category } from '../filter-sort/filter-sort.model';
import { RoomsService } from '@sections/housing/rooms/rooms.service';
import { HousingService } from '@sections/housing/housing.service';
import { RoomsStateService } from '@sections/housing/rooms/rooms-state.service';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoadingService } from '@core/service/loading/loading.service';
import { convertObjectToMap } from '@sections/housing/utils/convert-object-to-map';
import { FacilityOccupantDetails } from '@sections/housing/roommate/roommate.model';
import { FilterOptions } from 'src/app/app.global';

@Component({
  selector: 'st-search-filter-modal',
  templateUrl: './search-filter-modal.component.html',
  styleUrls: ['./search-filter-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFilterModalComponent implements OnInit {
  @ViewChild(FilterSortComponent) filterSort: FilterSortComponent;

  categories: Category[] = [];
  categoryOptionsDetails;
  categoryOptions: { [key: string]: string[] };

  filtersForm: FormGroup;
  occupants$: Observable<FacilityOccupantDetails[]>;
  constructor(
    private _roomsService: RoomsService,
    private _roomStateService: RoomsStateService,
    private _modalController: ModalController,
    private _housingService: HousingService,
    private _loadingService: LoadingService,
    private _router: Router,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this._loadingService.showSpinner();
    const occupiedFacilities = this._roomStateService.getOccupiedFacilities();
    if (occupiedFacilities) {
      const facilityKeys: number[] = occupiedFacilities.map(x => x.facilityId);
      this.occupants$ = this._initFilter(facilityKeys);
    }
  }
  private _initFilter(facilityKeys: number[]): Observable<FacilityOccupantDetails[]> | Observable<null> {
    if (facilityKeys && facilityKeys.length > 0) {
      return this._housingService
        .getAllOccupantDetails(this._roomStateService.getActiveRoomSelect().key, facilityKeys)
        .pipe(
          tap(() => {
            this._handleFilters();
          }),
          map(data => {
            return data;
          })
        );
    } else {
      return of(null).pipe(
        tap(() => this._handleFilters()),
        map(data => data)
      );
    }
  }
  close(): Promise<boolean> {
    return this._modalController.dismiss();
    // make call to update facilities with new options
  }
  private _handleFilters() {
    this.categories = this._roomsService.getFilterCategories();
    this.categoryOptions = this._roomsService.getFilterOptions(this.categories);
    this.sortAssigmentLimitOption();

    const builderOptions = {};
    for (const item in this.categoryOptions) {
      const optionsInfo = this._roomsService.getAttributeOptionsInfo(item, this.categoryOptions[item]);
      builderOptions[item] = this._formBuilder.array(optionsInfo.map(x => x.isSelected));
    }
    this._loadingService.closeSpinner();
    this.filtersForm = this._formBuilder.group(builderOptions);
  }

  filter(data) {
    this._loadingService.showSpinner();

    const categoriesToFilter = new Map<string, boolean[]>();
    const dataMap = convertObjectToMap<boolean[]>(data);
    dataMap.forEach((values, key) => {
      const selected = values.find(x => x);
      if (selected) {
        categoriesToFilter.set(key, values);
      }
    });
    const filterOptions: Map<string, string[]> = new Map<string, string[]>();
    let hasPatronAttribute = false;
    categoriesToFilter.forEach((options, category) => {
      const selectedOptions: number[] = [];
      let lastFound = 0;
      while (lastFound !== -1) {
        const index: number = options.indexOf(true, lastFound);
        if (category.includes('Patron ')) {
          hasPatronAttribute = true;
        }
        lastFound = index + 1;
        if (index !== -1) {
          selectedOptions.push(index);
        } else {
          break;
        }
      }
      if (selectedOptions.length > 0) {
        const values = selectedOptions.map(x => this.categoryOptions[category][x]);
        filterOptions.set(category, values);
      }
    });
    if (filterOptions.size === 0) {
      this._roomsService.clearFilter();
      this._goToBuildingsTab();
    } else {
      this._roomsService.filterBuildings(filterOptions, hasPatronAttribute);
      this.goToUnitsTab();
    }
  }
  private goToUnitsTab(): void {
    this.close().then(() => {
      this._loadingService.closeSpinner();
      this._router
        .navigateByUrl(`patron/housing/rooms-search/${this._roomStateService.getActiveRoomSelect().key}/units`)
        .catch();
    });
  }

  private _goToBuildingsTab(): void {
    this.close().then(() => {
      this._loadingService.closeSpinner();
      this._router.navigateByUrl(
        `patron/housing/rooms-search/${this._roomStateService.getActiveRoomSelect().key}/buildings`
      );
    });
  }

  clearFilters(): void {
    this.filtersForm.reset();
  }

  getLabelInfo(key: string, index: number): string {
    for (const prop in this.categoryOptions) {
      if (prop === key) {
        return this.categoryOptions[prop][index];
      }
    }
  }

  getArrayName(property: string): string {
    let name: string;
    if (property.includes('Facility')) {
      name = property.replace('Facility ', '');
    } else {
      name = property.replace('Patron ', '');
    }
    return name;
  }

  getId(key: string, index: number): number {
    return Number(key) - index;
  }
  sortAssigmentLimitOption() {
    const options = this.categoryOptions[FilterOptions.FACILITY_ASSIGMENT_LIMIT];
    const sortedOptions = options.map(i => parseInt(i, 10)).sort((a, b) => a - b);
    this.categoryOptions[FilterOptions.FACILITY_ASSIGMENT_LIMIT] = sortedOptions.map(String);
  }
}
