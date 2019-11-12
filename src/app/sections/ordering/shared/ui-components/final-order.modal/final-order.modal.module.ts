import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinalOrderComponent } from './final-order.modal.component';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [FinalOrderComponent],
  imports: [CommonModule, StHeaderModule, IonicModule],
  exports: [FinalOrderComponent],
  entryComponents: [FinalOrderComponent],
})
export class FinalOrderModule {}
