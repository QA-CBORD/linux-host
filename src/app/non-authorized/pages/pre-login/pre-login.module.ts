import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PreLoginComponent } from './component/pre-login.component';

@NgModule({
  declarations: [PreLoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: PreLoginComponent
    }])
  ]
})
export class PreLoginModule { }
