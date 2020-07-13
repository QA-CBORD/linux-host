import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionsRoutingModule } from '@sections/sections-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SectionsRoutingModule,
  ],
})
export class SectionsModule {
  constructor() {
  }
}
