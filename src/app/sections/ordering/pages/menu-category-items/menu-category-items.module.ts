import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuCategoryItemsRoutingModule } from './menu-category-items.routing.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { MenuCategoryItemsComponent } from './menu-category-items.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { IonicModule } from '@ionic/angular';
import { ViewCartModule } from '@sections/ordering/shared/ui-components/view-cart';
import { PriceUnitsResolverModule } from '@sections/ordering/shared/pipes/price-units-resolver/price-units-resolver.module';
import { TranslateModule } from '@ngx-translate/core';

const imports = [
  CommonModule,
  IonicModule,
  MenuCategoryItemsRoutingModule,
  StHeaderModule,
  ViewCartModule,
  PriceUnitsResolverModule,
  CategoryListComponent,
  TranslateModule,
];
const declarations = [MenuCategoryItemsComponent];

@NgModule({
  declarations,
  imports,
})
export class MenuCategoryItemsModule {}
