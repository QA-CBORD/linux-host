import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessibleSelectModule } from './directives/accessible-select.module';

@NgModule({
  imports: [CommonModule, AccessibleSelectModule],
})
export class AccessibilityModule {}
