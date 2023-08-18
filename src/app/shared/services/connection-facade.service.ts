import { Injectable } from '@angular/core';
import { RetryHandler } from '@shared/ui-components/no-connectivity-screen/model/connectivity-page.model';
import { ConnectionService } from './connection-service';
import { ANONYMOUS_ROUTES } from 'src/app/non-authorized/non-authorized.config';
import { LoadingService } from '@core/service/loading/loading.service';
import { ModalController } from '@ionic/angular';
import { CommonService } from './common.service';
import { ContentStringApi, ContentStringCategory } from '@shared/model/content-strings/content-strings-api';
import { ConnectivityScreentDefaultStrings } from '@shared/model/content-strings/default-strings';
import { ConnectivityErrorType } from '@shared/ui-components/no-connectivity-screen/model/connectivity-error.enum';
import { ConnectivityScreenCsModel } from '@shared/ui-components/no-connectivity-screen/model/no-connectivity.cs.model';
import { firstValueFrom } from 'rxjs';
import { ConnectivityScreen } from '@shared/ui-components/no-connectivity-screen/connectivity-screen';
import { NavigationService } from './navigation.service';


@Injectable({
  providedIn: 'root'
})
export class ConnectionFacadeService {
  private pinModalOpened = false;
  private connectivityModalOpened = false;
  constructor(
    private connectionService: ConnectionService,
    private modalController: ModalController,
    private readonly commonService: CommonService,
    private loadingService: LoadingService,
    private readonly routingService: NavigationService
  ) { }

  private isOpened(): boolean {
    return this.routingService.isRoute(ANONYMOUS_ROUTES.noConnectivity)
  }

  public isConnectionError(error): boolean {
    return this.connectionService.isConnectionIssues(error);
  }

  private async isOpenedAsModal() {
    const currentTopModal = await this.modalController.getTop();
    return currentTopModal && currentTopModal.componentProps.retryHandler;
  }


  setPinModalOpened(isOpened: boolean) {
    this.pinModalOpened = isOpened;
  }

  isModalOpened(): boolean {
    return this.pinModalOpened || this.connectivityModalOpened;
  }

  async handleConnectionError(handler: RetryHandler, showAsModal = true, isVaultLocked = true) {
    if (showAsModal) {
      if ((await this.isOpenedAsModal())) {
        this.connectionService.modalRefreshHandle.next(true);
      } else {
        return this.showConnectionIssuePageAsModal(handler, isVaultLocked);
      }
    } else {
      if (this.isOpened()) {
        this.connectionService.modalRefreshHandle.next(true);
      } else {
        return await this.showConnectivityIssuePage(handler, isVaultLocked);
      }
    }
  }

  private async showConnectivityIssuePage(retryHandler: RetryHandler, isVaultLocked: boolean) {
    const navBackUrl = this.routingService.getUrl();
    this.routingService.navigateAnonymous(ANONYMOUS_ROUTES.noConnectivity, { queryParams: { isVaultLocked, navBackUrl } }).then(() => this.connectionService.retrySubject.next(retryHandler));
    return new Promise((resolve) => retryHandler.onClose = resolve)
  }

  private async showConnectionIssuePageAsModal(retryHandler: RetryHandler, isVaultLocked: boolean) {
    this.loadingService.showSpinner();
    let csModel: ConnectivityScreenCsModel;
    let freshContentStringsLoaded = false;
    const errorType = await this.connectionService.getOfflineStatus();
    if (errorType === ConnectivityErrorType.DEVICE_CONNECTION) {
      csModel = ContentStringApi[ContentStringCategory.noConnectivity].build({
        params: ConnectivityScreentDefaultStrings,
      });
    } else {
      csModel = await firstValueFrom(this.commonService.loadContentString(ContentStringCategory.noConnectivity));
      freshContentStringsLoaded = true;
    }
    return this.presentModal({ csModel, freshContentStringsLoaded, errorType, retryHandler, isVaultLocked });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async presentModal(componentProps: any): Promise<any> {
    const modal = await this.modalController.create({
      backdropDismiss: false,
      showBackdrop: true,
      mode: 'ios',
      componentProps,
      component: ConnectivityScreen,
    });
    this.connectivityModalOpened = true;
    await modal.present();
    await this.loadingService.closeSpinner();
    return await modal.onDidDismiss().finally(() => this.connectivityModalOpened = false);
  }

}
