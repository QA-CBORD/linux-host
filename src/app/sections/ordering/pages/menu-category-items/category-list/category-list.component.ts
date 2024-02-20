import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuCategoryItemInfo } from '@sections/ordering';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { PriceUnitsResolverModule } from '@sections/ordering/shared/pipes/price-units-resolver/price-units-resolver.module';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'st-category-list',
  standalone: true,
  imports: [CommonModule, IonicModule, PriceUnitsResolverModule],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryListComponent {
  @Input() menuCategoryItems: MenuCategoryItemInfo[] = [];
  @Input() mealBased: boolean;
  @Output() onItemClicked: EventEmitter<string> = new EventEmitter<string>();
  awsImageUrl: string = this.environmentFacadeService.getImageURL();

  constructor(private readonly environmentFacadeService: EnvironmentFacadeService) {}

  triggerMenuItemClick({ menuItem: { id } }) {
    this.onItemClicked.emit(id);
  }
}
