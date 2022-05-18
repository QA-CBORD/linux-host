import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ScanCardComponent } from './scan-card.component';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { StActivateLocationItemModule } from '@shared/ui-components/st-activate-location-item/st-activate-location-item.module';
import { ScanCardRoutingModule } from './scan-card.routing';
import { ScanCardResolverService } from '@sections/dashboard/containers/scan-card/scan-card-resolver.service';
import { Brightness } from '@ionic-native/brightness/ngx';

const imports = [IonicModule, CommonModule, StHeaderModule, StActivateLocationItemModule, ScanCardRoutingModule];
const declarations = [ScanCardComponent];
const providers = [ScanCardResolverService, Brightness];

@NgModule({
  imports,
  declarations,
  providers,
})
export class ScanCardModule {
}
