import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemManualEntryComponent } from './item-manual-entry.component';
import { ItemManualEntryRoutingModule } from './item-manual-entry.routing.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { IonicModule } from '@ionic/angular';
import { StButtonModule } from '@shared/ui-components/st-button';
import { StInputFloatingLabelModule } from '@shared/ui-components/st-input-floating-label/st-input-floating-label.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ItemManualEntryComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ItemManualEntryRoutingModule,
    StHeaderModule,
    StButtonModule,
    StInputFloatingLabelModule,
  ],
})
export class ItemManualEntryModule {}
