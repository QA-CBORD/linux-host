import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { EditHomePageModalComponent } from './components/edit-home-page-modal';
import { TileWrapperConfig } from '@sections/dashboard/models';
import { TILES_ID } from './dashboard.config';
import { Observable } from 'rxjs';
import { TileConfigFacadeService } from '@sections/dashboard/tile-config-facade.service';
import { CONTENT_STRING_NAMES } from '@sections/accounts/pages/meal-donations/content-strings';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { CONTENT_STINGS_CATEGORIES, CONTENT_STINGS_DOMAINS } from '../../content-strings';
import { AccessCardComponent } from './containers/access-card/access-card.component';
import { AccessCardService } from './containers/access-card/services/access-card.service';
import { ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';

@Component({
  selector: 'st-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage implements OnInit {
  @ViewChild(AccessCardComponent) accessCard:AccessCardComponent;
  tiles$: Observable<TileWrapperConfig[]>;

  constructor(
    private readonly modalController: ModalController,
    private readonly tileConfigFacadeService: TileConfigFacadeService,
    private readonly contentStringsFacadeService: ContentStringsFacadeService,
  ) {
  }

  get tilesIds(): { [key: string]: string } {
    return TILES_ID;
  }

  ngOnInit() {
    this.tiles$ = this.tileConfigFacadeService.tileSettings$;
    this.updateDonationMealsStrings();
    this.updateOrderingStrings();
  }

  ionViewWillEnter(){
    this.accessCard.ionViewWillEnter();
  }

  async presentEditHomePageModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: EditHomePageModalComponent,
    });
    return await modal.present();
  }

  trackFn(i, { id, iconPath }): string {
    return id + iconPath;
  }

  private async updateDonationMealsStrings(): Promise<void> {
    const res = await this.tileConfigFacadeService.resolveAsyncUpdatingConfig({
      title: this.contentStringsFacadeService.getContentStringValue$(
        CONTENT_STINGS_DOMAINS.patronUi,
        CONTENT_STINGS_CATEGORIES.mealDonation,
        CONTENT_STRING_NAMES.dashboardTitle),
      buttonConfig: {
        title: this.contentStringsFacadeService.getContentStringValue$(
          CONTENT_STINGS_DOMAINS.patronUi,
          CONTENT_STINGS_CATEGORIES.mealDonation,
          CONTENT_STRING_NAMES.buttonDonateAMeal),
      },
    });

    await this.tileConfigFacadeService.updateConfigById(TILES_ID.mealDonations, res);
  }

  private async updateOrderingStrings(): Promise<void> {
    const res = await this.tileConfigFacadeService.resolveAsyncUpdatingConfig({
      title: this.contentStringsFacadeService.getContentStringValue$(
        CONTENT_STINGS_DOMAINS.patronUi,
        CONTENT_STINGS_CATEGORIES.ordering,
        ORDERING_CONTENT_STRINGS.labelDashboard),
    });

    await this.tileConfigFacadeService.updateConfigById(TILES_ID.order, res);
  }
}
