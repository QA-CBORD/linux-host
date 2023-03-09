import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuCategoryItemsComponent } from './menu-category-items.component';


const routes: Routes = [
  {
    path: '',
    component: MenuCategoryItemsComponent,
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class MenuCategoryItemsRoutingModule { }
