import { ChangeDetectionStrategy, Component, ViewChild, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';

import { FilterSortComponent } from '../filter-sort/filter-sort.component';
import { SortControlComponent } from '../filter-sort/sort-control/sort-control.component';

import { generateCategories } from '../filter-sort/filter-sort.mock';

import { Category } from '../filter-sort/filter-sort.model';

@Component({
  selector: 'st-search-filter-modal',
  templateUrl: './search-filter-modal.component.html',
  styleUrls: ['./search-filter-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFilterModalComponent implements OnInit {
  @ViewChild(FilterSortComponent) filterSort: FilterSortComponent;

  categories: Category[] = generateCategories();

  filtersForm: FormGroup;

  beds: boolean[] = [false, false, false, false, false, false];

  floors: boolean[] = [false, false, false, false, false, false];

  constructor(private _modalController: ModalController, private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.filtersForm = this._formBuilder.group({
      monthRange: 1000,
      termRange: 1000,
      beds: this._formBuilder.array(this.beds),
      floors: this._formBuilder.array(this.floors),
    });
  }

  close(): void {
    this._modalController.dismiss();
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

  sort(control: SortControlComponent): void {}
}
