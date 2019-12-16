import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ScanCardComponent } from './scan-card.component';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { StActivateLocationItemModule } from '@shared/ui-components/st-activate-location-item/st-activate-location-item.module';
import { ScanCardRoutingModule } from './scan-card.routing';
import { UserService } from '@core/service/user-service/user.service';
import { InstitutionService } from '@core/service/institution/institution.service';

const imports = [IonicModule, CommonModule, StHeaderModule, StActivateLocationItemModule, ScanCardRoutingModule];
const declarations = [ScanCardComponent];
const providers = [];

@NgModule({
  imports,
  declarations,
  providers,
})
export class ScanCardModule {}