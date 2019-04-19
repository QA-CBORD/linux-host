import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { StPopoverComponent } from './st-popover.component';

const imports = [CommonModule, FormsModule, IonicModule];
const declarations = [StPopoverComponent];
const entryComponents = [StPopoverComponent];
@NgModule({
  imports,
  declarations,
  entryComponents,
})
export class StPopoverModule {}
