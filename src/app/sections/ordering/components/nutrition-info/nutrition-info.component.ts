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
    TranslateModule,
  ],
  template: `
    <ion-item-divider class="order-detail__divider" mode="ios">
      <ion-label translate>patron-ui.ordering.nutritional_info.title</ion-label>
    </ion-item-divider>
    <ion-accordion-group>
      <ion-accordion value="nutritionInfo">
        <ion-item slot="header" class="nutrition-info__header">
          <ion-label translate>patron-ui.ordering.nutritional_info.section_title</ion-label>
        </ion-item>
        <div slot="content">
          <ion-card>
            <ion-card-content class="ion-no-padding">
              <ion-list>
                @for (item of nutritionData; track item.name) {
                <ion-item [class.nutrition-info__subItem]="item.subItem" [class.nutrition-info__item]="!item.subItem">
                  <ion-label>{{ item.name }}</ion-label>
                  <ion-note color="dark" slot="end">{{ item.value }}</ion-note>
                </ion-item>
                }
              </ion-list>
            </ion-card-content>
          </ion-card>
          <div class="nutrition-info__disclaimer" translate>patron-ui.ordering.nutritional_info.disclaimer</div>
        </div>
      </ion-accordion>
    </ion-accordion-group>
  `,
  styleUrl: './nutrition-info.component.scss',
})
export class NutritionInfoComponent {
  nutritionData: { name: string; value: string; subItem?: boolean }[] = [];
  @Input() set menuItem(menuItem: MenuItemInfo) {
    this.nutritionData = [];
    if (!menuItem) {
      return;
    }
    if (menuItem.calories) {
      this.nutritionData.push({ name: 'Calories', value: `${menuItem.calories}` });
    }
    if (menuItem.carbs) {
      this.nutritionData.push({ name: 'Total Carbohydrates', value: `${menuItem.carbs}g` });
    }
    if (menuItem.protein) {
      this.nutritionData.push({ name: 'Protein', value: `${menuItem.protein}g` });
    }
  }
}
