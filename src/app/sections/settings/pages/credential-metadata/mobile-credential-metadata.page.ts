import { Component, OnInit } from '@angular/core';
import { LoadingService } from '@core/service/loading/loading.service';
import { ModalController } from '@ionic/angular';
import { MobileCredentialsComponent } from '@shared/ui-components/mobile-credentials/mobile-credentials.component';
import { TermsContent } from '@shared/ui-components/mobile-credentials/model/android/android-credential-content-strings.model';
import { HIDCredentialManager } from '@shared/ui-components/mobile-credentials/model/android/hid/hid-credential-manager';
import { MobileCredentialFacade } from '@shared/ui-components/mobile-credentials/service/mobile-credential-facade.service';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';

@Component({
  selector: 'st-mc-metadata',
  templateUrl: './mobile-credential-metadata.page.html',
  styleUrls: ['./mobile-credential-metadata.page.scss'],
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
      this.isHid = this.mobileCredentialFacade.credentialController instanceof HIDCredentialManager;
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