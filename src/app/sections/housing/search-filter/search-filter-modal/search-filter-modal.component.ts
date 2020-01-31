import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { SortControlComponent } from '../filter-sort/sort-control/sort-control.component';

import { generateCategories } from '../filter-sort/filter-sort.mock';

import { Category } from '../filter-sort/filter-sort.model';

@Component({
  selector: 'st-search-filter-modal',
  templateUrl: './search-filter-modal.component.html',
  styleUrls: ['./search-filter-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFilterModalComponent {
  categories: Category[] = generateCategories();

  constructor(private modalController: ModalController) {}

  close(): void {
    this.modalController.dismiss();
  }

  sort(control: SortControlComponent): void {}
}
