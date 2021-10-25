import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItemFinderComponent } from './menu-item-finder.component';
import { IonicModule } from '@ionic/angular';
import { ItemManualEntryModule } from '@sections/ordering/pages/item-manual-entry/item-manual-entry.module';

@NgModule({
  declarations: [MenuItemFinderComponent],
  exports: [MenuItemFinderComponent],
  imports: [
    CommonModule,
    IonicModule, ItemManualEntryModule
  ]
})
export class MenuItemFinderModule { }
