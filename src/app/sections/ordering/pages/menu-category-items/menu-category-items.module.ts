import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuCategoryItemsRoutingModule } from './menu-category-items.routing.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { MenuCategoryItemsComponent } from './menu-category-items.component';
import { CategoryListComponent } from './category-list/category-list.component';


const imports = [CommonModule, MenuCategoryItemsRoutingModule, StHeaderModule];
const declarations = [MenuCategoryItemsComponent, CategoryListComponent];


@NgModule({
  declarations,
  imports,
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MenuCategoryItemsModule { }