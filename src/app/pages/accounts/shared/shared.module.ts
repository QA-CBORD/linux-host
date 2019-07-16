import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from './pipes/pipes.module';

const sharedModules = [PipesModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...sharedModules],
  exports: [...sharedModules],
})
export class AccountsSharedModule {}
