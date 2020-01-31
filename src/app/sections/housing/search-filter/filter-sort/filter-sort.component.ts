import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewChildren,
  QueryList,
} from '@angular/core';

import { SortControlComponent } from './sort-control/sort-control.component';

import { Category } from './filter-sort.model';

@Component({
  selector: 'st-filter-sort',
  templateUrl: './filter-sort.component.html',
  styleUrls: ['./filter-sort.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterSortComponent {
  @Input() categories: Category[];

  @Output() sorted: EventEmitter<SortControlComponent> = new EventEmitter<SortControlComponent>();

  @ViewChildren(SortControlComponent) sortControls: QueryList<SortControlComponent>;

  sort(control: SortControlComponent): void {
    if (control.isSelected) {
      this.select(control);

      return;
    }

    this.unselectAll();

    this.select(control);
  }

  private select(control: SortControlComponent): void {
    control.select();

    this.sorted.emit(control);
  }

  private unselectAll(): void {
    this.sortControls.forEach((control: SortControlComponent) => control.unselect());
  }
}
