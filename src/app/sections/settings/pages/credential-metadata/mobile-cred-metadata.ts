import { Component, OnInit } from '@angular/core';
import { LoadingService } from '@core/service/loading/loading.service';
import { ModalController } from '@ionic/angular';
import { MobileCredentialsComponent } from '@shared/ui-components/mobile-credentials/mobile-credentials.component';
import { AndroidCredentialDataService } from '@shared/ui-components/mobile-credentials/model/shared/android-credential-data.service';
import { HidCredentialDataService } from '@shared/ui-components/mobile-credentials/service/hid-credential.data.service';
import { MobileCredentialFacade } from '@shared/ui-components/mobile-credentials/service/mobile-credential-facade.service';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';

@Component({
  selector: 'st-mobile-credential',
  templateUrl: './mobile-credential.component.html',
  styleUrls: ['./mobile-credential.component.scss'],
})
export class MobileCredentialMetadata implements OnInit {
  deviceState: any = {};
  isHid: boolean = true;

  constructor(
    public readonly mobileCredentialFacade: MobileCredentialFacade,
    private readonly modalCtrl: ModalController,
    protected readonly loadingService: LoadingService,
    private globalNav: GlobalNavService
  ) {}

  ngOnInit(): void {
    (async () => {
      this.deviceState = await this.mobileCredentialFacade.deviceState$;
      this.globalNav.hideNavBar();
      this.isHid = this.mobileCredentialFacade.credentialService$ instanceof HidCredentialDataService;
    })();
  }

  close() {
    this.modalCtrl.dismiss();
  }

  async loadTerms(): Promise<void> {
    this.createModal({
      showFooter: false,
      closeNavbar: false,
      termsAndConditions: await this.termsAndConditionsSource$(),
    });
  }

  async loadUsageInstructions() {
    this.createModal({
      title: 'Usage instructions',
      showFooter: false,
      closeNavbar: false,
      termsAndConditions: await this.usageInstructions$(),
    });
  }

  private async createModal(componentProps): Promise<void> {
    const modal = await this.modalCtrl.create({
      backdropDismiss: false,
      component: MobileCredentialsComponent,
      componentProps,
    });
    await modal.present();
  }

  async usageInstructions$(): Promise<string> {
    this.loadingService.showSpinner();
    const usageText$ = await (<AndroidCredentialDataService>(
      this.mobileCredentialFacade.credentialService$
    )).credentialUsageContentString$();
    this.loadingService.closeSpinner();
    return usageText$;
  }

  async termsAndConditionsSource$(): Promise<string> {
    this.loadingService.showSpinner();
    const terms = await (<AndroidCredentialDataService>(
      this.mobileCredentialFacade.credentialService$
    )).termsContentString$();
    this.loadingService.closeSpinner();
    return terms;
  }
}
