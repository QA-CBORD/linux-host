import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportCardComponent } from './report-card.component';
import { ReportCardRoutingModule } from './report-card-routing.module';
import { IonicModule } from '@ionic/angular';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { StButtonModule } from '@shared/ui-components/st-button/st-button.module';

const declarations = [ReportCardComponent];
@NgModule({
  declarations,
  imports: [CommonModule, IonicModule, StHeaderModule, StButtonModule, ReportCardRoutingModule],
})
export class ReportCardModule {}
