import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiComponentsModule } from './ui-components/ui-components.module';
import { PipesModule } from './pipes/pipes.module';

const sharedModules = [PipesModule, UiComponentsModule];

@NgModule({
  imports: [CommonModule, ...sharedModules],
  exports: [...sharedModules],
})
export class OrderingSharedModule {}
