import { Injectable } from '@angular/core';
import { CoordsService } from '@core/service/coords/coords.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { ModalController } from '@ionic/angular';
import { ContentStringCategory } from '@shared/model/content-strings/content-strings-api';
import { CommonService } from '@shared/services/common.service';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { CheckInPendingComponent } from '../components/check-in-pending/check-in-pending.component';
import { CheckingContentCsModel } from '../contents-strings/checkin-content-string.model';

@Injectable()
export class CheckingProcess {
  constructor(
    private readonly modalController: ModalController,
    private readonly loadingService: LoadingService,
    private readonly commonService: CommonService,
    private readonly coordsService: CoordsService,
  ) {}

  async start({ id: orderId, dueTime, checkNumber, total, merchantId, mealBased }, orderNew=false): Promise<HTMLIonModalElement> {
    let locationPermissionDisabled = true;
    try {
      const {
        coords: { latitude, longitude },
      } = await this.coordsService
        .getCoords()
        .pipe(first())
        .toPromise();
      locationPermissionDisabled = !(latitude && longitude);
    } catch (error) {}

    this.loadingService.showSpinner();
    const { content: contentStrings } = <any>await this.getContent();
    const modal = await this.modalController.create({
      component: CheckInPendingComponent,
      componentProps: {
        orderNew,
        contentStrings,
        locationPermissionDisabled,
        orderId,
        dueTime,
        checkNumber,
        mealBased,
        total,
        merchantId,
        location$: this.coordsService.location$,
      },
    });

    this.loadingService.closeSpinner();
    await modal.present();
    return modal;
  }

  /**
   * solo se llama al cargar el primer componente del flow de checking
   * @returns
   */
  loadAllContentString(): Observable<CheckingContentCsModel> {
    return this.commonService.loadContentString(ContentStringCategory.checkin);
  }

  /**
   * llamar desde cualquier component del flow de checking
   * @returns
   */
  async getContent(): Promise<CheckingContentCsModel> {
    let contentStrings = <any>this.commonService.getString(ContentStringCategory.checkin);
    if (!contentStrings.title) contentStrings = await this.loadAllContentString().toPromise();
    return Promise.resolve(contentStrings);
  }
}
