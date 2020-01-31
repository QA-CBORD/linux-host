import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewChildren,
  QueryList,
} from '@angular/core';

import { Category } from './filter-sort.model';
import { SortControlComponent } from './sort-control/sort-control.component';

@Component({
  selector: 'st-filter-sort',
  templateUrl: './filter-sort.component.html',
  styleUrls: ['./filter-sort.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterSortComponent {
  @Input() categories: Category[];

  @Output() sorted: EventEmitter<Category> = new EventEmitter<Category>();

  @ViewChildren(SortControlComponent) sortControls: QueryList<SortControlComponent>;

  sort(category: Category): void {
    this.sortControls.forEach((control: SortControlComponent) => control.unselect());

    this.sorted.emit(category);
  }
}
