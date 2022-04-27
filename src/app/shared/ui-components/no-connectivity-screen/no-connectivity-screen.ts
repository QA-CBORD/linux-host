import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeFacadeService } from '@core/service/barcode/barcode.facade.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { ModalController, ToastController } from '@ionic/angular';
import { AccessCardService } from '@sections/dashboard/containers/access-card/services/access-card.service';
import { ContentStringCategory } from '@shared/model/content-strings/content-strings-api';
import { CommonService } from '@shared/services/common.service';
import { ConnectionService } from '@shared/services/connection-service';
import { firstValueFrom } from '@shared/utils';
import { map } from 'rxjs/operators';
import { ROLES, User } from 'src/app/app.global';
import { ANONYMOUS_ROUTES } from 'src/app/non-authorized/non-authorized.config';
import { ConnectivityError, ConnectivityPageConfig, connectivityPageConfigurations, ConnectivityScreenCsModel } from './model/no-connectivity.cs.model';
import { RetryHandler } from './model/retry-handler';
import { Subscription } from 'rxjs';

@Component({
  selector: 'st-no-connectivity-screen',
  templateUrl: './no-connectivity-screen.html',
  styleUrls: ['./no-connectivity-screen.scss'],
})
export class NoConnectivityScreen implements OnInit, OnDestroy {

  @Input() csModel: ConnectivityScreenCsModel;
  @Input() retryHandler: RetryHandler;
  @Input() errorType: ConnectivityError;
  @Input() freshContentStringsLoaded: boolean = false;

  strings: any;

  isLoading: boolean = false;
  config: ConnectivityPageConfig;
  canScanCard: boolean = false;
  refreshSubscrription: Subscription;

  constructor(
    private readonly connectionService: ConnectionService,
    private readonly loadingService: LoadingService,
    public readonly modalController: ModalController,
    private readonly router: Router,
    private readonly toastService: ToastController,
    private readonly commonService: CommonService,
    private readonly accessCardService: AccessCardService,
    private readonly barcodeFacadeService: BarcodeFacadeService,
    private readonly changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.dataInitialize();
    this.addSubscription();
  }


  async dataInitialize() {
    this.config = connectivityPageConfigurations[this.errorType];
    this.strings = this.config.getContent(this.csModel);
    const canScan = async () => {
      const isServerError = this.errorType === ConnectivityError.SERVER_CONNECTION;
      return isServerError || !!(await firstValueFrom(this.barcodeFacadeService.getInStorage(User.Settings.CASHLESS_KEY)));
    };
    this.canScanCard = await canScan();
  }

  async retryOperations() {
    const retrySuccess = await this.retryHandler.onRetry();
    if (retrySuccess) {
      await this.closeSelf();
    } else {
      this.onRetryFailed();
    }
  }

  async onRetryFailed() {
    await this.loadingService.showSpinner({ duration: 30000 });
    await this.setConnectionErrorType();
    await this.loadFreshContentStrings();
    await this.dataInitialize();
    this.changeDetector.detectChanges();
    await this.loadingService.closeSpinner();
    if ((await this.showRetryToast())) {
      this.retryOperations();
    }
  }

  ngOnDestroy(): void {
    this.toastService.dismiss().catch(() => { });
  }


  async addSubscription() {
    this.refreshSubscrription = this.connectionService.modalRefreshHandle.subscribe((refresh) => {
      if (refresh) {
        this.onRetryFailed();
      }
    })
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
    const { data } = await myToast.onDidDismiss();
    return data ? true : false;
  }

  async loadFreshContentStrings(): Promise<void> {
    if (!this.freshContentStringsLoaded && this.errorType == ConnectivityError.SERVER_CONNECTION) {
      this.csModel = await firstValueFrom(this.commonService.loadContentString(ContentStringCategory.noConnectivity));
      this.freshContentStringsLoaded = true;
    }
  }

  async scanCard() {
    await this.retryHandler.onScanCode();
    await this.loadingService.showSpinner();
    const color = await this.institutionColor();
    

    this.router.navigate([ROLES.anonymous, ANONYMOUS_ROUTES.scanCard], { queryParams: { color } })
      .then(() => this.closeSelf())
      .finally(() => this.loadingService.closeSpinner());
  }


  async closeSelf() {
    this.modalController.dismiss();
  }

  async setConnectionErrorType(): Promise<void> {
    const isDeviceOffline = await this.connectionService.deviceOffline();
    if (isDeviceOffline) {
      this.errorType = ConnectivityError.DEVICE_CONNECTION;
    } else {
      this.errorType = ConnectivityError.SERVER_CONNECTION;
    }
  }

  async institutionColor() {
    if (!(await this.connectionService.deviceOffline())) {
      return await firstValueFrom(this.accessCardService.getInstitutionColor().pipe(
        map(v => '#' + (JSON.parse(v) ? JSON.parse(v)['native-header-bg'] : ''))))
        .catch(() => '');
    }
    return ''
  }

}
