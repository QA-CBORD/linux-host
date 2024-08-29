import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { IonicModule } from '@ionic/angular';
import { SettingsPage } from './settings.page';
import { PhotoUploadComponent } from './pages/photo-upload/photo-upload.component';
import { SettingsItemComponent } from './components/settings-item/settings-item.component';
import { SettingsFactoryService } from './services/settings-factory.service';
import { HTMLRendererModule } from '@shared/ui-components/html-renderer/html-renderer.module';
import { PhoneEmailComponent } from '@shared/ui-components/phone-email/phone-email.component';
import { EditHomePageModalModule } from '@shared/ui-components/edit-home-page-modal/edit-home-page-modal.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { ReportCardModule } from '@sections/settings/pages/report-card/report-card.module';
import { MobileCredentialModule } from '@shared/ui-components/mobile-credentials/mobile.credential.module';
import { PasswordChangeModule } from '@shared/ui-components/change-password/password-change.module';
import { CreditCardModule } from './creditCards/credit-card.module';
import { ModalsService } from '@core/service/modals/modals.service';
import { TranslateModule } from '@ngx-translate/core';


const imports = [
  CommonModule,
  IonicModule,
  SettingsRoutingModule,
  PhotoUploadComponent,
  HTMLRendererModule,
  PhoneEmailComponent,
  StHeaderModule,
  EditHomePageModalModule,
  ReportCardModule,
  MobileCredentialModule,
  PasswordChangeModule,
  CreditCardModule,
  SettingsItemComponent,
  TranslateModule,
];
const declarations = [SettingsPage];
const providers = [SettingsFactoryService, ModalsService];
@NgModule({
  declarations,
  imports,
  providers,
})
export class SettingsModule {}
