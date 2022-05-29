import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StButtonModule } from '@shared/ui-components/st-button';
import { PinPage } from './pin.page';
import { AccessibilityService } from '@shared/accessibility/services/accessibility.service';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, StButtonModule],
  declarations: [PinPage],
  exports: [PinPage],
  entryComponents: [PinPage],
  providers: [AccessibilityService]
})
export class PinModule {}
