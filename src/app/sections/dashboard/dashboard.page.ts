import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { EditHomePageModalComponent } from './components/edit-home-page-modal';
import { TileWrapperConfig } from '@sections/dashboard/models';
import { AccountsService, DashboardService } from './services';
import {  TILES_TITLE } from './dashboard.config';
import { Observable } from 'rxjs';
import { TileConfigFacadeService } from '@sections/dashboard/tile-config-facade.service';

@Component({
  selector: 'st-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage implements OnInit {
  tiles$: Observable<TileWrapperConfig[]>;

  constructor(
    private readonly modalController: ModalController,
    private readonly dashboardService: DashboardService,
    private readonly accountsService: AccountsService,
    private readonly tileConfigFacadeService: TileConfigFacadeService,
  ) {
  }

  get tilesTitle() {
    return TILES_TITLE;
  }

  ngOnInit() {
    this.tiles$ = this.tileConfigFacadeService.tileSettings$();
  }

  async presentEditHomePageModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: EditHomePageModalComponent,
    });
    return await modal.present();
  }
}
