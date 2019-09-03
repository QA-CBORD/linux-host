import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiComponentsModule } from './ui-components/ui-components.module';

const sharedModules = [UiComponentsModule];

@NgModule({
  imports: [CommonModule, ...sharedModules],
  exports: [...sharedModules],
})
export class OrderingSharedModule {}
