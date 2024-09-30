import { Component, OnInit } from '@angular/core';
import { LoadingService } from '@core/service/loading/loading.service';
import { ModalController } from '@ionic/angular';
import { MobileCredentialsComponent } from '@shared/ui-components/mobile-credentials/mobile-credentials.component';
import { HIDSeosCredentialManager } from '@shared/ui-components/mobile-credentials/model/android/hid/hid-credential-manager';
import { HIDWalletCredentialManager } from '@shared/ui-components/mobile-credentials/model/android/hid/hid-wallet-credential-manager';
import { MobileCredentialFacade } from '@shared/ui-components/mobile-credentials/service/mobile-credential-facade.service';

@Component({
  selector: 'st-mc-metadata',
  templateUrl: './mobile-credential-metadata.page.html',
  styleUrls: ['./mobile-credential-metadata.page.scss'],
})
export class MobileCredentialMetadata implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deviceState: any = {};
  isHid = true;

  constructor(
    public readonly mobileCredentialFacade: MobileCredentialFacade,
    private readonly modalCtrl: ModalController,
    protected readonly loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    (async () => {
      this.deviceState = await this.mobileCredentialFacade.deviceState$;
      this.isHid = this.mobileCredentialFacade.credentialController instanceof HIDSeosCredentialManager || this.mobileCredentialFacade.credentialController instanceof HIDWalletCredentialManager;
    })();
  }

  close() {
    this.modalCtrl.dismiss();
  }

  async viewTerms(): Promise<void> {
    const terms = (await this.mobileCredentialFacade.credentialController.contentStringAsync()).termString$;
    this.createModal({
      showFooter: false,
      closeNavbar: false,
      terms,
    });
  }

  async viewUsageInstructions() {
    const _str = (await this.mobileCredentialFacade.credentialController.contentStringAsync()).usageDialogString$;
    this.createModal({
      showFooter: false,
      closeNavbar: false,
      title: _str.title,
      usageText: _str.mContent,
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
}
