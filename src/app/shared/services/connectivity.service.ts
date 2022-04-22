import { ComponentRef, Injectable } from '@angular/core';
import { LoadingService } from '@core/service/loading/loading.service';
import { ModalController } from '@ionic/angular';
import { ContentStringApi, ContentStringCategory } from '@shared/model/content-strings/content-strings-api';
import { noConnectivityScreentDefaultStrings } from '@shared/model/content-strings/default-strings';
import { ConnectivityError, ConnectivityScreenCsModel } from '@shared/no-connectivity-screen/model/no-connectivity.cs.model';
import { RetryHandler } from '@shared/no-connectivity-screen/model/retry-handler';
import { NoConnectivityScreen } from '@shared/no-connectivity-screen/no-connectivity-screen';
import { firstValueFrom } from '@shared/utils';
import { CommonService } from './common.service';
import { ConnectionService } from './connection-service';


@Injectable({
  providedIn: 'root'
})
export class ConnectivityService {

  constructor(
    private modalController: ModalController,
    private readonly commonService: CommonService,
    private loadingService: LoadingService,
    private connectionService: ConnectionService
  ) { }

  async isOpened() {
    const currentTopModal = await this.modalController.getTop();
    return currentTopModal && currentTopModal.componentProps.retryHandler;
  }


  async handleConnectionError(handler: RetryHandler) {
    console.log("handleConnectionError:: ", handler)
    if ((await this.isOpened())) {
      this.connectionService.modalRefreshHandle.next(true);
    } else {
      return await this.showConnectivityIssuePage(handler);
    }
  }

  async closeIfOpened() {
    if ((await this.isOpened())) {
        await this.modalController.dismiss();
    }
  }


  private async showConnectivityIssuePage(retryHandler: RetryHandler) {
    await this.loadingService.showSpinner({ duration: 80000 });
    let csModel: ConnectivityScreenCsModel = {} as any;
    let errorType: ConnectivityError;
    let freshContentStringsLoaded: boolean = false;
    if ((await this.connectionService.deviceOffline())) {
      errorType = ConnectivityError.DEVICE_CONNECTION;
      csModel = ContentStringApi[ContentStringCategory.noConnectivity].build({ params: noConnectivityScreentDefaultStrings });
    } else {
      errorType = ConnectivityError.SERVER_CONNECTION;
      csModel = await firstValueFrom(this.commonService.loadContentString(ContentStringCategory.noConnectivity));
      freshContentStringsLoaded = true;
    }
    return this.presentModal({ csModel, freshContentStringsLoaded, errorType, retryHandler });
  }


  private async presentModal(componentProps: any): Promise<any> {
    const modal = await this.modalController.create({
      backdropDismiss: false,
      mode: 'ios',
      componentProps,
      component: NoConnectivityScreen,
    });
    await modal.present();
    await this.loadingService.closeSpinner();
    return await modal.onDidDismiss();
  }
}
