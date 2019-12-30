import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FilterComponent } from './filter.component';
import { FilterMenuComponent } from './filter-menu/filter-menu.component';
import { AccountNamePipe } from './pipes/account-name.pipe';
import { TimeRangePipe } from './pipes/time-range.pipe';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
  ],
  declarations: [FilterComponent, FilterMenuComponent, AccountNamePipe, TimeRangePipe],
  entryComponents: [FilterMenuComponent],
  exports: [FilterComponent]
})
export class FilterModule { }
