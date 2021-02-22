import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PreLoginComponent } from './component/pre-login.component';
import { IonicModule } from '@ionic/angular';
import { StButtonModule } from '@shared/ui-components/st-button';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';

@NgModule({
  declarations: [PreLoginComponent],
  imports: [
    CommonModule,
    IonicModule,
    StButtonModule,
    StHeaderModule,
    RouterModule.forChild([{
      path: '',
      component: PreLoginComponent
    }])
  ]
})
export class PreLoginModule { }
