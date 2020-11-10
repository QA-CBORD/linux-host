import { ChangeDetectionStrategy, Component, ViewChild, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';

import { FilterSortComponent } from '../filter-sort/filter-sort.component';
import { SortControlComponent } from '../filter-sort/sort-control/sort-control.component';

import { generateCategories } from '../filter-sort/filter-sort.mock';

import { Category, CategoryOptions } from '../filter-sort/filter-sort.model';
import { RoomsService } from '@sections/housing/rooms/rooms.service';
import { HousingService } from '@sections/housing/housing.service';
import { RoomsStateService } from '@sections/housing/rooms/rooms-state.service';
import { observable, Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { OccupantAttribute } from '@sections/housing/attributes/attributes.model';

@Component({
  selector: 'st-search-filter-modal',
  templateUrl: './search-filter-modal.component.html',
  styleUrls: ['./search-filter-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFilterModalComponent implements OnInit {
  @ViewChild(FilterSortComponent) filterSort: FilterSortComponent;

  categories: Category[] = [];

  categoryOptions: {[key: string]: string[]}

  filtersForm: FormGroup;
  occupants$: Observable<any>
  constructor(private _roomsService: RoomsService,
              private _roomStateService: RoomsStateService,
              private _modalController: ModalController,
              private _housingService: HousingService,
              private _formBuilder: FormBuilder) {}

  ngOnInit(): void {

    const facilityKeys: number[] = this._roomStateService.getOccupiedFacilities().map(x => x.facilityId);
    this.occupants$ =  this._initFilter(facilityKeys);
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
            builderOptions[item] = this._formBuilder.array(this.categoryOptions[item]);
          }
          this.filtersForm = this._formBuilder.group(builderOptions);
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

  clearFilters(): void {
    if (this.filterSort) {
      this.filterSort.unselectAll();
    }
  }

  getArrayName(property: string): string {
    let name = '';
    if(property.includes('Facility')) {
      name = property.replace('Facility ', '');
    } else {
      name = property.replace('Patron ', '');
    }
    return name;
  }

  sort(control: SortControlComponent): void {}
}
