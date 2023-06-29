import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MobileCredentialMetadata } from '@sections/settings/pages/credential-metadata/mobile-credential-metadata.page';
import { StButtonModule } from '@shared/ui-components/st-button';
import { StHeaderModule } from '../st-header/st-header.module';
import { MobileCredentialsComponent } from './mobile-credentials.component';

const declarations = [MobileCredentialsComponent, MobileCredentialMetadata];
@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule.forChild([]), StHeaderModule, StButtonModule],
  declarations: declarations,
  exports: declarations,
})
export class MobileCredentialModule {}
