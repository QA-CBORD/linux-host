import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuCategoryItemInfo } from '@sections/ordering';
import { Environment } from '../../../../../environment';

@Component({
  selector: 'st-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryListComponent {
  @Input() menuCategoryItems: MenuCategoryItemInfo[];
  @Input() mealBased: boolean;
  @Output() onItemClicked: EventEmitter<string> = new EventEmitter<string>();
  awsImageUrl: string = Environment.getImageURL();

  triggerMenuItemClick({ menuItem: { id } }) {
    this.onItemClicked.emit(id);
  }
}
