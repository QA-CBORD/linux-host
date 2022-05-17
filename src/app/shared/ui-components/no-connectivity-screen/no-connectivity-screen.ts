import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarcodeFacadeService } from '@core/service/barcode/barcode.facade.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { ModalController, ToastController } from '@ionic/angular';
import { AccessCardService } from '@sections/dashboard/containers/access-card/services/access-card.service';
import { ContentStringCategory } from '@shared/model/content-strings/content-strings-api';
import { CommonService } from '@shared/services/common.service';
import { ConnectionService } from '@shared/services/connection-service';
import { firstValueFrom } from '@shared/utils';
import { map } from 'rxjs/operators';
import { Settings, User } from 'src/app/app.global';
import { ConnectivityErrorType, ConnectivityPageConfig, connectivityPageConfigurations, ConnectivityScreenCsModel } from './model/no-connectivity.cs.model';
import { ConnectivityPageInfo, ExecStatus, RetryHandler } from './model/connectivity-page.model';
import { Subscription } from 'rxjs';
import { ScanCardComponent } from '@sections/dashboard/containers/scan-card';

@Component({
  selector: 'st-no-connectivity-screen',
  templateUrl: './no-connectivity-screen.html',
  styleUrls: ['./no-connectivity-screen.scss'],
})
export class NoConnectivityScreen implements OnInit, OnDestroy {

  refreshSubscription: Subscription;
  retrySubscription: Subscription;
  routeSubscription: Subscription;
  @Input() csModel: ConnectivityScreenCsModel;
  @Input() retryHandler: RetryHandler;
  @Input() errorType: ConnectivityErrorType;
  @Input() freshContentStringsLoaded: boolean = false;

  strings: any;

  isLoading: boolean = false;
  config: ConnectivityPageConfig;
  canScanCard: boolean = false;

  constructor(
    private readonly connectionService: ConnectionService,
    private readonly loadingService: LoadingService,
    private readonly toastService: ToastController,
    private readonly commonService: CommonService,
    private readonly accessCardService: AccessCardService,
    private readonly barcodeFacadeService: BarcodeFacadeService,
    private readonly changeDetector: ChangeDetectorRef,
    private readonly activatedRoute: ActivatedRoute,
    private readonly modalController: ModalController,
  ) { }

  ngOnInit() {
    this.init();
    this.addSubscription();
  }


  async dataInitialize(data: ConnectivityPageInfo) {
    this.csModel = data?.csModel || this.csModel;
    this.freshContentStringsLoaded = data?.freshContentStringsLoaded || this.freshContentStringsLoaded;
    this.errorType = data?.errorType || this.errorType;

    this.config = connectivityPageConfigurations[this.errorType];
    this.strings = this.config.getContent(this.csModel);
    this.canScanCard = await (async () => {
      const isServerError = this.errorType === ConnectivityErrorType.SERVER_CONNECTION;
      const cashlessKeyInCache = !!(await firstValueFrom(this.barcodeFacadeService.getInStorage(User.Settings.CASHLESS_KEY)));
      return isServerError && cashlessKeyInCache || cashlessKeyInCache;
    })();
  }

  async init() {
    this.routeSubscription = this.activatedRoute.data.subscribe(async ({ data }) => {
      console.log("ROUTING DATA: ", data);
      this.dataInitialize(data);
    });
  }

  async retryOperations(canShowToast: boolean = true) {
    const retrySuccess = await this.retryHandler.onRetry();
    if (retrySuccess) {
      console.log("GOIN TO CLOSE.....");
      this.closeSelf(ExecStatus.Execution_success);
    } else {
      this.onRetryFailed(canShowToast);
    }
  }

  async onRetryFailed(canShowToast: boolean) {
    await this.closeToastIfOpened();
    await this.loadingService.showSpinner();
    await this.setConnectionErrorType();
    await this.loadFreshContentStrings();
    await this.dataInitialize(this);
    this.changeDetector.detectChanges();
    await this.loadingService.closeSpinner();
    if (canShowToast && (await this.showRetryToast())) {
      this.retryOperations(false);
    }
  }

  ngOnDestroy(): void {
    console.log("GETTING DESTROYED::");
    this.routeSubscription.unsubscribe();
    this.refreshSubscription.unsubscribe();
    this.retrySubscription.unsubscribe();
    this.closeToastIfOpened();
  }



  async addSubscription() {
    this.refreshSubscription = this.connectionService.modalRefreshHandle.subscribe((refresh) => {
      if (refresh) {
        this.onRetryFailed(true);
      }
    });

    this.retrySubscription = this.connectionService.retrySubject.subscribe((handler) => {
      console.log("RECIEVED RETRY HANDLER: ", handler);
      this.retryHandler = handler;
    });
  }

  private async showRetryToast(): Promise<boolean> {
    const string$ = this.strings;
    let myToast = await this.toastService.create({
      message: string$.connect_failed,
      duration: 3000,
      mode: 'ios',
      position: 'top',
      buttons: [
        {
          icon: '/assets/icon/Union.svg',
          cssClass: 'toast-message',
          side: 'start',
          handler: () => myToast.dismiss(false)
        },
        {
          text: string$.retry,
          handler: () => myToast.dismiss(true)
        },
        {
          text: "|",
          handler: () => { },
        },
        {
          icon: "/assets/icon/remove_x_icon.svg",
          handler: () => myToast.dismiss(),
        }
      ],
    });
    myToast.setAttribute('role', 'alert');
    await myToast.present();
    const { data: shouldRetryAgain } = await myToast.onDidDismiss();
    console.log("data: ", shouldRetryAgain);
    return shouldRetryAgain;
  }

  async loadFreshContentStrings(): Promise<void> {
    if (!this.freshContentStringsLoaded && this.errorType == ConnectivityErrorType.SERVER_CONNECTION) {
      this.csModel = await firstValueFrom(this.commonService.loadContentString(ContentStringCategory.noConnectivity));
      this.freshContentStringsLoaded = true;
    }
  }

  async scanCard() {
    if (this.retryHandler.onScanCode)
      await this.retryHandler.onScanCode();
    await this.openScanCard();
    console.log("SCAN card got closed")
  }


  async openScanCard(): Promise<any> {
    await this.loadingService.showSpinner();
    await this.closeToastIfOpened();
    const color = await this.institutionColor();
    await firstValueFrom(this.barcodeFacadeService.getSetting(Settings.Setting.PATRON_DISPLAY_MEDIA_TYPE));
    let componentProps = { color, isBackButtonShow: false, isDismissButtonShow: true };
    const pinModal = await this.modalController.create({
      backdropDismiss: true,
      component: ScanCardComponent,
      componentProps,
    });
    this.loadingService.closeSpinner();
    await pinModal.present();
    return await pinModal.onDidDismiss();
  }


  async closeSelf(status: ExecStatus) {
    try {
      await this.modalController.dismiss(null, status);
    } catch (err) {
      console.log("ERROR CLOSING MODAL: ", err);
    }
  }

  async setConnectionErrorType(): Promise<void> {
    const isDeviceOffline = await this.connectionService.deviceOffline();
    if (isDeviceOffline) {
      this.errorType = ConnectivityErrorType.DEVICE_CONNECTION;
    } else {
      this.errorType = ConnectivityErrorType.SERVER_CONNECTION;
    }
  }

  async institutionColor() {
    const defaultInstitutionColor = "";
    const deviceOffline = (await this.connectionService.deviceOffline());
    if (deviceOffline) return defaultInstitutionColor;
    return await firstValueFrom(this.accessCardService.getInstitutionColor())
      .then((v) => {
        const valueAsJson = JSON.parse(v);
        return '#' + (valueAsJson ? valueAsJson['native-header-bg'] : defaultInstitutionColor)
      }).catch(() => defaultInstitutionColor);
  }

  async closeToastIfOpened() {
    await this.toastService.dismiss()
      .catch((ignored) => { /** ignored error, do not remove error block though */ });
  }

}
