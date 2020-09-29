import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { StButtonModule } from '@shared/ui-components/st-button';
import { MobileCredentialsComponent } from './mobile-credentials.component';

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
    entryComponents: [MobileCredentialsComponent]
})
export class MobileCredentialModule{

}