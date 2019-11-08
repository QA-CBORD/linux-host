import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuCategoryItemsRoutingModule } from './menu-category-items.routing.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { MenuCategoryItemsComponent } from './menu-category-items.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { IonicModule } from '@ionic/angular';
import { ViewCartModule } from '@sections/ordering/shared/ui-components/view-cart';

const imports = [CommonModule, IonicModule, MenuCategoryItemsRoutingModule, StHeaderModule, ViewCartModule];
const declarations = [MenuCategoryItemsComponent, CategoryListComponent];

@NgModule({
  declarations,
  imports,
})
export class MenuCategoryItemsModule {}
