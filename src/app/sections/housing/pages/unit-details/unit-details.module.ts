import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { UnitDetailsRoutingModule } from './unit-details.routing.module';

import { UnitDetailsPage } from './unit-details.page';
import { LabelModule } from '@shared/ui-components/label/label.module';
import { RoommateComponent } from '@sections/housing/roommate/roommate.component';

const imports = [CommonModule, FormsModule, IonicModule, UnitDetailsRoutingModule];
const declarations = [UnitDetailsPage];

@NgModule({
  imports: [
    imports,
    LabelModule,
  ],
  declarations: [
    declarations,
    RoommateComponent,
  ],
})
export class UnitDetailsPageModule {}
