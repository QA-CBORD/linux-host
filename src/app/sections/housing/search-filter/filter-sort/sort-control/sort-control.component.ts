import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, HostBinding } from '@angular/core';

import { Category, SortDirection } from '../filter-sort.model';

@Component({
  selector: 'st-sort-control',
  templateUrl: './sort-control.component.html',
  styleUrls: ['./sort-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortControlComponent {
  @Input() category: Category;

  @Output() sorted: EventEmitter<SortControlComponent> = new EventEmitter<SortControlComponent>();

  @HostBinding('class.selected')
  isSelected: boolean;

  sortDirection: SortDirection;

  isAscend(): boolean {
    return this.isSelected && this.sortDirection === SortDirection.ascend;
  }

  isDescend(): boolean {
    return this.isSelected && this.sortDirection === SortDirection.descend;
  }

  sort(): void {
    this.sorted.emit(this);
  }

  select(): void {
    this.isSelected = true;
    this.sortDirection = this.isDescend() ? SortDirection.ascend : SortDirection.descend;
  }

  unselect(): void {
    this.isSelected = false;
    this.sortDirection = SortDirection.ascend;
  }
}
