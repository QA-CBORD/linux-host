import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from './search.pipe';
import { AccessibilityService } from '@shared/accessibility/services/accessibility.service';

const declarations = [SearchPipe];

@NgModule({
  declarations,
  imports: [CommonModule],
  providers: [AccessibilityService],
  exports: declarations,
})
export class SearchPipeModule {}
