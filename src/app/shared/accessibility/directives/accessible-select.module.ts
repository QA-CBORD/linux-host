import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessibleSelectDirective } from './accessible-select.directive';
import { AccessibilityService } from '../services/accessibility.service';

const declarations = [AccessibleSelectDirective];

@NgModule({
  declarations,
  imports: [CommonModule],
  exports: declarations,
  providers: [AccessibilityService]
})
export class AccessibleSelectModule {}
