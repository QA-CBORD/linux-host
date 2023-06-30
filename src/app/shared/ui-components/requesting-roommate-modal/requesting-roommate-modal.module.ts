import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { RequestingRoommateModalComponent } from './requesting-roommate-modal.component';
import { StHeaderModule } from '../st-header/st-header.module';
import { StButtonModule } from '../st-button/st-button.module';

export const imports = [CommonModule, IonicModule, StHeaderModule, StButtonModule];
export const declarations = [RequestingRoommateModalComponent];

@NgModule({
  imports,
  exports: declarations,
  declarations,
})
export class RequestingRoommateModalModule {}
