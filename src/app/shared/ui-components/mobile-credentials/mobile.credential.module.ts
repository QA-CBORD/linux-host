import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MobileCredentialMetadata } from '@sections/settings/pages/credential-metadata/mobile-cred-metadata';
import { StButtonModule } from '@shared/ui-components/st-button';
import { StHeaderModule } from '../st-header/st-header.module';
import { MobileCredentialsComponent } from './mobile-credentials.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule.forChild([]), StHeaderModule,StButtonModule],
  declarations: [MobileCredentialsComponent, MobileCredentialMetadata],
  exports: [MobileCredentialsComponent, MobileCredentialMetadata],
  entryComponents: [MobileCredentialsComponent, MobileCredentialMetadata],
})
export class MobileCredentialModule {}
