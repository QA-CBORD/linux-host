import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditHomePageModalComponent } from './edit-home-page-modal.component';
import { IonicModule } from '@ionic/angular';
import { TileConfigFacadeService } from '@sections/dashboard/tile-config-facade.service';
import { DashboardService } from '@sections/dashboard/services';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [EditHomePageModalComponent],
  exports: [EditHomePageModalComponent],
  providers: [TileConfigFacadeService, DashboardService],
  imports: [CommonModule, IonicModule, TranslateModule],
})
export class EditHomePageModalModule {}
