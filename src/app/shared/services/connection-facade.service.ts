import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { RetryHandler } from '@shared/ui-components/no-connectivity-screen/model/connectivity-page.model';
import { ConnectionService } from './connection-service';
import { ANONYMOUS_ROUTES } from 'src/app/non-authorized/non-authorized.config';
import { ROLES } from 'src/app/app.global';
import { LoadingService } from '@core/service/loading/loading.service';
import { ModalController } from '@ionic/angular';
import { CommonService } from './common.service';
import { ContentStringApi, ContentStringCategory } from '@shared/model/content-strings/content-strings-api';
import { ConnectivityScreentDefaultStrings } from '@shared/model/content-strings/default-strings';
import { ConnectivityErrorType, ConnectivityScreenCsModel } from '@shared/ui-components/no-connectivity-screen/model/no-connectivity.cs.model';
import { firstValueFrom } from '@shared/utils';
import { ConnectivityScreen } from '@shared/ui-components/no-connectivity-screen/connectivity-screen';


@Injectable({
  providedIn: 'root'
})
export class ConnectionFacadeService {
  private pinModalOpened = false;
  private connectivityModalOpened = false;
  constructor(
    private connectionService: ConnectionService,
    private readonly router: Router,
    private ngZone: NgZone,
    private modalController: ModalController,
    private readonly commonService: CommonService,
    private loadingService: LoadingService,
  ) { }

  private isOpened(): boolean {
    return this.router.url.includes(ANONYMOUS_ROUTES.noConnectivity);
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

  async handleConnectionError(handler: RetryHandler, showAsModal = false, isVaultLocked = true) {
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
    this.ngZone.run(() => this.router.navigate([ROLES.anonymous, ANONYMOUS_ROUTES.noConnectivity], { replaceUrl: true, state: { isVaultLocked } }).then(() => this.connectionService.retrySubject.next(retryHandler)));
  }

  private async showConnectionIssuePageAsModal(retryHandler: RetryHandler, isVaultLocked: boolean) {
    this.loadingService.showSpinner();
    let csModel: ConnectivityScreenCsModel = {} as any;
    let errorType: ConnectivityErrorType;
    let freshContentStringsLoaded = false;
    if ((await this.connectionService.deviceOffline())) {
      errorType = ConnectivityErrorType.DEVICE_CONNECTION;
      csModel = ContentStringApi[ContentStringCategory.noConnectivity].build({ params: ConnectivityScreentDefaultStrings });
    } else {
      errorType = ConnectivityErrorType.SERVER_CONNECTION;
      csModel = await firstValueFrom(this.commonService.loadContentString(ContentStringCategory.noConnectivity));
      freshContentStringsLoaded = true;
    }
    return this.presentModal({ csModel, freshContentStringsLoaded, errorType, retryHandler, isVaultLocked });
  }

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
