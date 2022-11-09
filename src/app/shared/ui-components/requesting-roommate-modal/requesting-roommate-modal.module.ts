import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { RequestingRoommateModalComponent } from './requesting-roommate-modal.component';
import { StHeaderModule } from '../st-header/st-header.module';

export const imports = [CommonModule, IonicModule, StHeaderModule];
export const declarations = [RequestingRoommateModalComponent];

@NgModule({
  imports,
  exports: declarations,
  declarations,
  entryComponents: [RequestingRoommateModalComponent],
})
export class RequestingRoommateModalModule {}
