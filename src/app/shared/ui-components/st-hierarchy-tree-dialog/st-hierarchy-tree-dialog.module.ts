import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StHierarcheTreeDialogComponent } from './st-hierarchy-tree-dialog.component';
import { IonicModule } from '@ionic/angular';
import { OrderByPipeModule } from '@shared/pipes/order-by-pipe/order-by-pipe.module';
import { SwiperModule } from 'swiper/angular';


const declarations = [StHierarcheTreeDialogComponent];

@NgModule({
  declarations,
  imports: [
    CommonModule,
    IonicModule,
    SwiperModule,
    OrderByPipeModule,
    SwiperModule
  ],
  exports: declarations,
})
export class StHierarcheTreeDialogModule { }
