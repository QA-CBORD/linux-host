import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuCategoryItemsRoutingModule } from './menu-category-items.routing.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { MenuCategoryItemsComponent } from './menu-category-items.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { IonicModule } from '@ionic/angular';


const imports = [CommonModule, IonicModule, MenuCategoryItemsRoutingModule, StHeaderModule];
const declarations = [MenuCategoryItemsComponent, CategoryListComponent];


@NgModule({
  declarations,
  imports,
})
export class MenuCategoryItemsModule { }