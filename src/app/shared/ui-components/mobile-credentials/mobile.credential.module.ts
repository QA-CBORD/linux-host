import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { StButtonModule } from '@shared/ui-components/st-button';
import { MobileCredentialsComponent } from './mobile-credentials.component';
import { HIDCredentialManager } from './model/android/hid/hid-credential-manager';
import { MobileCredentialDataService } from './model/shared/mobile-credential-data.service';
import { GooglePayCredentialDataService } from './service/google-pay-credential.data.service';
import { HidCredentialDataService } from './service/hid-credential.data.service';
import { IOSCredentialManager } from './service/ios-credential-manager';
import { MobileCredentialFacade } from './service/mobile-credential-facade.service';
import { AndroidCredentialManagerFactory } from './service/android-credential-manager.factory';

const routes: Routes = [
  {
    path: '',
    component: MobileCredentialsComponent,
  },
];

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule.forChild(routes), StButtonModule],
  declarations: [MobileCredentialsComponent],
  exports: [MobileCredentialsComponent],
  // providers: [
  //   MobileCredentialDataService,
  //   AndroidCredentialManagerFactory,
  //   MobileCredentialFacade,
  //   HidCredentialDataService,
  //   HIDCredentialManager,
  //   GooglePayCredentialDataService,
  //   IOSCredentialManager
  // ],
  entryComponents: [MobileCredentialsComponent],
})
export class MobileCredentialModule {}
