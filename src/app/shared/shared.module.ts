import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UiComponentsModule } from './ui-components/ui-components.module';
import { PipesModule } from './pipes/pipes.module';
import { DirectivesModule } from './directives/directives.module';

const sharedModules = [PipesModule, DirectivesModule, UiComponentsModule, ReactiveFormsModule];

@NgModule({
  imports: [CommonModule, ...sharedModules],
  exports: [...sharedModules],
})
export class SharedModule { }
