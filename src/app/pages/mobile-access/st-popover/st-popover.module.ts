import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { StPopoverComponent } from './st-popover.component';
import { Pdf417BarcodeModule } from 'pdf417-barcode';

const imports = [CommonModule, FormsModule, IonicModule, Pdf417BarcodeModule];
const declarations = [StPopoverComponent];
const entryComponents = [StPopoverComponent];
@NgModule({
  imports,
  declarations,
  entryComponents,
})
export class StPopoverModule {}
