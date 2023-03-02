import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { OrderFiltersActionSheetComponent } from './order-filters.action-sheet.component';
import { StButtonModule } from '@shared/ui-components/st-button/st-button.module';
import { AccessibilityService } from '@shared/accessibility/services/accessibility.service';
import { AddressHeaderFormatPipe } from '@shared/pipes/address-header-format-pipe';
import { FormsModule } from '@angular/forms';

const declarations = [OrderFiltersActionSheetComponent];

@NgModule({
  declarations,
  exports: [OrderFiltersActionSheetComponent],
  entryComponents: [OrderFiltersActionSheetComponent],
  imports: [CommonModule, IonicModule, StButtonModule, FormsModule],
  providers: [AccessibilityService, AddressHeaderFormatPipe],
})
export class OrderFiltersActionSheetModule {}
