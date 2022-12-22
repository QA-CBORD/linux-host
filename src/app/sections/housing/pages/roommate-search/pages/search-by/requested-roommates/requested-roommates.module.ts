import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RequestedRoommatesComponent } from './requested-roommates.component';

export const imports = [
  CommonModule,
  IonicModule,
];
export const declarations = [RequestedRoommatesComponent];

@NgModule({
  imports,
  exports: declarations,
  declarations,
})
export class RequestedRoommateModule {}
