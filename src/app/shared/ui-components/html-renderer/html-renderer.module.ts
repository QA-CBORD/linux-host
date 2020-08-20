import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StButtonModule } from '../st-button';
import { HTMLRendererComponent } from './html-renderer.component';

@NgModule({
  imports: [CommonModule, IonicModule, StButtonModule],
  declarations: [HTMLRendererComponent],
  exports: [HTMLRendererComponent],
  entryComponents: [HTMLRendererComponent],
})
export class HTMLRendererModule {}
