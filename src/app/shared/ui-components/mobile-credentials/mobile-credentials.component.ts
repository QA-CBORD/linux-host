import { Component, Input, OnInit } from '@angular/core';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { MobileCredential } from '@core/service/payments-api/model/credential-utils';
import { ModalController } from '@ionic/angular';
import { map, take } from 'rxjs/operators';
import { Plugins } from '@capacitor/core';
const { HIDPlugin } = Plugins;

@Component({
  selector: 'st-mobile-credentials',
  templateUrl: './mobile-credentials.component.html',
  styleUrls: ['./mobile-credentials.component.scss'],
})
export class MobileCredentialsComponent implements OnInit {
  @Input() credential: MobileCredential;

  showDismiss: boolean = true;

  btnText: string = 'Accept and Install';

  titleText: string = 'Terms of Use & Privacy Policy';

  termsAndCondition$: Promise<any>;

  constructor(
    private readonly loadingService: LoadingService,
    private modalController: ModalController,
    private contentStringFacade: ContentStringsFacadeService
  ) {}

  ngOnInit() {
    console.log('input data: ', this.credential);
    if (this.credential.isProvisioned()) {
      this.btnText = 'Uninstall Credential';
      this.titleText = 'Credential Status';
    } else {
      this.termsAndCondition$ = this.termsAndCondition();
    }
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter().....');
  }

  closePage(): void {
    this.loadingService.closeSpinner();
    this.modalController.dismiss();
  }

  back() {
    console.log('back called....');
  }

  onBtnClicked(): void {
    console.log('btn clicked');
    this.loadingService.showSpinner({ message: 'Processing... Please wait...' });
    if (this.credential.isProvisioned()) {
      // confirm here that the patron/user really wants to uninstall the mobile credential.
    } else {
      HIDPlugin.startupOrigo({ token: "KXYS-AHBD-AGKV-QHUN" }).then( () => {
        console.log("The token was sent");
      });
      // remove text on screen, call HID plugin to complete installation.
    }
  }

  private async termsAndCondition(): Promise<any> {
    const { domain, category, name } = this.credential.getTermsConditionConfig();
    return this.contentStringFacade
      .fetchContentString$(domain, category, name)
      .pipe(
        map(data => data.value),
        take(1)
      )
      .toPromise();
  }
}
