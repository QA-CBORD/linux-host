import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { StHeaderComponent } from './st-header/st-header.component';
import { StSpinnerComponent } from './st-spinner/st-spinner.component';
import { StCountdownComponent } from './st-countdown/st-countdown.component';
import { StPopoverLayoutComponent } from './st-popover-layout/st-popover-layout.component';
import { StNavTabsComponent } from './st-nav-tabs/st-nav-tabs.component';
import { StProgressBarComponent } from './st-progress-bar/st-progress-bar.component';
import { StGlobalPopoverComponent } from './st-global-popover';
import { StSelectFloatingLabelComponent } from './st-select-floating-label/st-select-floating-label.component';
import { StInputFloatingLabelComponent } from './st-input-floating-label/st-input-floating-label.component';
import { StTextareaFloatingLabelComponent } from './st-textarea-floating-label/st-textarea-floating-label.component';

const components = [
  StHeaderComponent,
  StSpinnerComponent,
  StCountdownComponent,
  StPopoverLayoutComponent,
  StNavTabsComponent,
  StProgressBarComponent,
  StGlobalPopoverComponent,
  StSelectFloatingLabelComponent,
  StInputFloatingLabelComponent,
  StTextareaFloatingLabelComponent
];

const entryComponents = [StGlobalPopoverComponent];

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [...components],
  entryComponents,
  exports: [...components],
})
export class UiComponentsModule {}
