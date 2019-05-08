import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StHeaderComponent } from './st-header/st-header.component';
import { StSpinnerComponent } from './st-spinner/st-spinner.component';
import { StCountdownComponent } from './st-countdown/st-countdown.component';
import { StPopoverLayoutComponent } from './st-popover-layout/st-popover-layout.component';

const components = [StHeaderComponent, StSpinnerComponent, StCountdownComponent, StPopoverLayoutComponent];

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [...components],
  exports: [...components],
})
export class UiComponentsModule {}
