import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FilterComponent } from './filter.component';
import { FilterMenuComponent } from './filter-menu/filter-menu.component';
import { AccountNamePipe } from './pipes/account-name.pipe';
import { TimeRangePipe } from './pipes/time-range.pipe';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FilterMenuComponent,
    TimeRangePipe,
    StHeaderModule,
  ],
  declarations: [FilterComponent, AccountNamePipe],
  exports: [FilterComponent]
})
export class FilterModule { }
