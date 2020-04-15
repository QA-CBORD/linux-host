import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ItemDetailModalComponent } from './item-detail-modal.component';
import { StPopoverLayoutModule } from '@shared/ui-components/st-popover-layout/st-popover-layout.module';

const declarations = [ItemDetailModalComponent];

@NgModule({
  declarations,
  exports: declarations,
  entryComponents: declarations,
  imports: [CommonModule, IonicModule, StPopoverLayoutModule],
})
export class ItemDetailModalModule {}
