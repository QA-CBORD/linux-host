import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StButtonModule } from '../st-button';
import { HTMLRendererComponent } from './html-renderer.component';
import { StHeaderModule } from '../st-header/st-header.module';

@NgModule({
  imports: [CommonModule, IonicModule, StButtonModule, StHeaderModule],
  declarations: [HTMLRendererComponent],
  exports: [HTMLRendererComponent],
})
export class HTMLRendererModule {}
