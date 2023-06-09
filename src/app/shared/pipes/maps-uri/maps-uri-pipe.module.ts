import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapsUriPipe } from './maps-uri.pipe';

@NgModule({
  declarations: [MapsUriPipe],
  exports: [MapsUriPipe],
  imports: [CommonModule],
})
export class MapsUriPipeModule {}
