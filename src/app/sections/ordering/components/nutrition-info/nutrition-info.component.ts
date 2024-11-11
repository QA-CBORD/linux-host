import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  IonItem,
  IonList,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonNote,
  IonAccordion,
  IonAccordionGroup,
  IonItemDivider,
} from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { MenuItemInfo, NutritionInfoList } from '@sections/ordering/shared/models';

@Component({
  selector: 'st-nutrition-info',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonNote,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonLabel,
    IonList,
    IonItem,
    IonNote,
    IonAccordion,
    IonAccordionGroup,
    IonItemDivider,
    NgTemplateOutlet,
    TranslateModule,
  ],
  templateUrl: './nutrition-info.component.html',
  styleUrl: './nutrition-info.component.scss',
})
export class NutritionInfoComponent {
  nutritionData: NutritionInfoList = [];
  allergens = '';
  hasNutritionInfo = false;

  @Input() set menuItem(menuItem: MenuItemInfo) {
    this.nutritionData = [];
    this.allergens = '';
    this.hasNutritionInfo = false;
    if (!menuItem) {
      return;
    }
    this.nutritionData = menuItem.nutritionInfo ?? [];
    this.allergens = menuItem.allergens?.join(', ').trim() ?? '';
    this.hasNutritionInfo = !!this.allergens || this.nutritionData.length > 0;
  }
}
