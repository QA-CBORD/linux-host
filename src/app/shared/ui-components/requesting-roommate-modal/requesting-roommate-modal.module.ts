import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { RequestingRoommateModalComponent } from './requesting-roommate-modal.component';

export const imports = [CommonModule, IonicModule];
export const declarations = [RequestingRoommateModalComponent];

@NgModule({
  imports,
  exports: declarations,
  declarations,
  entryComponents: [RequestingRoommateModalComponent],
})
export class RequestingRoommateModalModule {}
