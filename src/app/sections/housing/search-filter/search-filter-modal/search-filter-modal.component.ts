import { ChangeDetectionStrategy, Component, ViewChild, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';

import { FilterSortComponent } from '../filter-sort/filter-sort.component';
import { SortControlComponent } from '../filter-sort/sort-control/sort-control.component';

import { generateCategories } from '../filter-sort/filter-sort.mock';

import { Category, CategoryOptions } from '../filter-sort/filter-sort.model';
import { RoomsService } from '@sections/housing/rooms/rooms.service';

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

  beds: boolean[] = [false, false, false, false, false, false];

  floors: boolean[] = [false, false, false, false, false, false];

  constructor(private _roomsService: RoomsService,
              private _modalController: ModalController,
              private _formBuilder: FormBuilder,) {}

  ngOnInit(): void {
    this.categories = this._roomsService.getFilterCategories();
    this.categoryOptions =  this._roomsService.getFilterOptions(this.categories);
    console.log(this.categories);
    console.log(this.categoryOptions)
    const builderOptions = {};
    for (let item in this.categoryOptions) {
      builderOptions[item] = this._formBuilder.array(this.categoryOptions[item]);
    }
    console.log(builderOptions);
    this.filtersForm = this._formBuilder.group(builderOptions);

    console.log(this.filtersForm.controls)
  }

  close(): void {
    this._modalController.dismiss();
    // make call to update facilities with new options
  }

  clearFilters(): void {
    if (this.filterSort) {
      this.filterSort.unselectAll();
    }

    this.filtersForm.reset({
      monthRange: 1000,
      termRange: 1000,
    });
  }

  getArrayName(property: string): string {
    const name = property.replace('Facility ', '');
    return name;
  }

  sort(control: SortControlComponent): void {}
}
