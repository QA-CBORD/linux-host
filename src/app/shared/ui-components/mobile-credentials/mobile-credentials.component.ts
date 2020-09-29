import { Component, Input, OnInit } from '@angular/core';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { MobileCredential } from '@core/service/payments-api/model/credential-utils';
import { HidCredential } from '@core/service/payments-api/model/mobile-credential';
import { ModalController, PopoverController } from '@ionic/angular';
import { map, take } from 'rxjs/operators';

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
    private readonly modalController: ModalController,
    private readonly popoverCtrl: PopoverController,
    private contentStringFacade: ContentStringsFacadeService
  ) {}

  ngOnInit() {
    console.log('input data: ', this.credential);
    this.loadingService.closeSpinner();
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
    if (this.credential.isProvisioned()) {
      this.popoverCtrl.dismiss();
    } else {
      this.modalController.dismiss();
    }
  }

  back() {
    console.log('back called....');
  }

  onBtnClicked(): void {
    this.loadingService.showSpinner({ message: 'Processing... Please wait...' });
    if (this.credential.isProvisioned()) {
      // confirm here that the patron/user really wants to uninstall the mobile credential.
    } else {
      if (this.credential instanceof HidCredential) {
        // remove text on screen, call HID plugin to complete installation.
        const invitationCode = (<HidCredential>this.credential).getInvitationCode();
        console.log('invitationCode: ', invitationCode);
      }
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
