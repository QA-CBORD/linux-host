import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ConfirmPopoverComponent } from './confirm-popover.component';
import { StPopoverLayoutModule } from '@shared/ui-components/st-popover-layout/st-popover-layout.module';

const declarations = [ConfirmPopoverComponent];

@NgModule({
  declarations,
  exports: [ConfirmPopoverComponent],
  imports: [CommonModule, IonicModule, StPopoverLayoutModule],
})
export class ConfirmPopoverModule {}
