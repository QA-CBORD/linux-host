import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MobileAccessTileComponent } from './mobile-access-tile.component';
import { MobileAccessService } from './services/mobile-access.service';


const imports = [IonicModule, CommonModule];
const declarations = [MobileAccessTileComponent];
@NgModule({
  declarations,
  imports,
  providers: [MobileAccessService],
  exports: [MobileAccessTileComponent],
})
export class MobileAccessTileModule { }
