import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemManualEntryComponent } from './item-manual-entry.component';

const routes: Routes = [
  {
    path: '',
    component: ItemManualEntryComponent
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class ItemManualEntryRoutingModule { }
