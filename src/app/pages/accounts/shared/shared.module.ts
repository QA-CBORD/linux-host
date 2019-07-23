import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from './pipes/pipes.module';
import { UiComponentsModule } from './ui-components/ui-components.module';
import { DirectivesModule } from './directives/directives.module';

const sharedModules = [PipesModule, UiComponentsModule, DirectivesModule];

@NgModule({
  imports: [CommonModule, ...sharedModules],
  exports: [...sharedModules],
})
export class AccountsSharedModule {}
