import { ChangeDetectionStrategy, Component, ViewChild, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';

import { FilterSortComponent } from '../filter-sort/filter-sort.component';
import { SortControlComponent } from '../filter-sort/sort-control/sort-control.component';

import { Category } from '../filter-sort/filter-sort.model';
import { RoomsService } from '@sections/housing/rooms/rooms.service';
import { HousingService } from '@sections/housing/housing.service';
import { RoomsStateService } from '@sections/housing/rooms/rooms-state.service';
import { Observable } from 'rxjs';
import {  map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoadingService } from '@core/service/loading/loading.service';

@Component({
  selector: 'st-search-filter-modal',
  templateUrl: './search-filter-modal.component.html',
  styleUrls: ['./search-filter-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFilterModalComponent implements OnInit {
  @ViewChild(FilterSortComponent) filterSort: FilterSortComponent;

  categories: Category[] = [];
  categoryOptionsDetails
  categoryOptions: {[key: string]: string[]}

  filtersForm: FormGroup;
  occupants$: Observable<any>
  constructor(private _roomsService: RoomsService,
              private _roomStateService: RoomsStateService,
              private _modalController: ModalController,
              private _housingService: HousingService,
              private _loadingService: LoadingService,
              private _router: Router,
              private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this._loadingService.showSpinner();
    const facilityKeys: number[] = this._roomStateService.getOccupiedFacilities().map(x => x.facilityId);
    this.occupants$ =  this._initFilter(facilityKeys);
    this._loadingService.closeSpinner();
  }
  private _initFilter(facilityKeys): Observable<any> {
    return this._housingService.getAllOccupantDetails(this._roomStateService.getActiveRoomSelect().key, facilityKeys)
      .pipe(
        tap(data => {
          this.categories = this._roomsService.getFilterCategories();
          this.categoryOptions =  this._roomsService.getFilterOptions(this.categories);
          console.log(this.categories);
          console.log(this.categoryOptions)
          const builderOptions = {};
          for (let item in this.categoryOptions) {
            const optionsInfo = this._roomsService.getAttributeOptionsInfo(item, this.categoryOptions[item]);
            builderOptions[item] = this._formBuilder.array(optionsInfo.map(x => x.selected));
          }
          this.filtersForm = this._formBuilder.group(builderOptions);
          console.log(this.filtersForm)
        }),
        map(data => {
          return data;
        })
      )
  }
  close(): void {
    this._modalController.dismiss();
    // make call to update facilities with new options
  }

  filter(data: any) {
    const categoriesToFilter = data.filter(x => x.inclues(true));
    const filterOptions: Map<string, string[]> = new Map<string, string[]>();
    let hasPatronAttribute: boolean = false;
    categoriesToFilter.forEach((options, category)  => {
      const selectedOptions: number[] = [];
      let lastFound = 0;
      while(lastFound !== -1) {
        const index: number = category.indexOf((option) => option, lastFound);
        if(category.find(x => x.name.include('Patron '))) {
          hasPatronAttribute = true;
        }
        lastFound = index;
        if(index >= 0) {
          selectedOptions.push(index);
        }
      }
      if(selectedOptions.length > 0) {
        const values = selectedOptions.map(x => this.categoryOptions[category][x]);
        filterOptions.set(category, values);
      }
    });

    this._roomsService.filterBuildings(filterOptions, hasPatronAttribute);
    this._router.navigateByUrl("patron/housing/rooms-search/units/");
    close();
  }

  clearFilters(): void {
    if (this.filterSort) {
      this.filterSort.unselectAll();
    }
  }

  getLabelInfo(key: string, index: number): string {
    for(const prop in this.categoryOptions) {
      if(prop === key) {
        return this.categoryOptions[prop][index];
      }
    }
  }

  getArrayName(property: string): string {
    let name: string;
    if(property.includes('Facility')) {
      name = property.replace('Facility ', '');
    } else {
      name = property.replace('Patron ', '');
    }
    return name;
  }

  sort(control: SortControlComponent): void {}
}
