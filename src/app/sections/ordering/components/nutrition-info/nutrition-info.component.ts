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
import { MenuItemInfo } from '@sections/ordering/shared/models';

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
  nutritionData: { name: string; value: string; subItem?: boolean }[] = [];
  allergens = '';
  hasNutritionInfo = false;

  @Input() set menuItem(menuItem: MenuItemInfo) {
    this.nutritionData = [];
    this.allergens = '';
    this.hasNutritionInfo = false;
    if (!menuItem) {
      return;
    }
    this.buildNutritionData(menuItem);
    this.allergens = menuItem.allergens?.join(', ').trim() ?? '';
    this.hasNutritionInfo = !!this.allergens || this.nutritionData.length > 0;
  }

  private buildNutritionData(menuItem: MenuItemInfo) {
    type NutritionField = {
      key: keyof MenuItemInfo;
      label: string;
      unit: string;
    };

    const nutritionFields: NutritionField[] = [
      { key: 'protein', label: 'Protein', unit: 'g' },
      { key: 'calories', label: 'Calories', unit: '' },
      { key: 'carbs', label: 'Total Carbohydrates', unit: 'g' },
      { key: 'cholesterol', label: 'Cholesterol', unit: 'mg' },
      { key: 'sodium', label: 'Sodium', unit: 'mg' },
      { key: 'sugar', label: 'Sugar', unit: 'g' },
      { key: 'dietaryFiber', label: 'Dietary Fiber', unit: 'g' },
    ];

    this.nutritionData = nutritionFields
      .filter(field => menuItem[field.key])
      .map(field => ({
        name: field.label,
        value: `${menuItem[field.key]}${field.unit}`,
      }));
  }
}
