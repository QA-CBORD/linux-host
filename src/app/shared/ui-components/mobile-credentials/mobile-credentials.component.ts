import { Component, Input, OnInit } from '@angular/core';
import { GlobalNavService } from '../st-global-navigation/services/global-nav.service';
import { ModalController, PopoverController } from '@ionic/angular';
import { TermsContent } from './model/android/android-credential-content-strings.model';

@Component({
  selector: 'st-mobile-credentials',
  templateUrl: './mobile-credentials.component.html',
  styleUrls: ['./mobile-credentials.component.scss'],
})
export class MobileCredentialsComponent implements OnInit {
  @Input() title: string;
  @Input() terms: TermsContent;
  @Input() usageText: Promise<string>;
  @Input() buttonText: string;
  @Input() showFooter: boolean = true;
  @Input() closeNavbar: boolean = true;

  constructor(
    private globalNav: GlobalNavService,
    private readonly modalCtrl: ModalController,
    private popoverCtrl: PopoverController
  ) {}

  ngOnInit() {
    setTimeout(() => {
      if (this.terms) {
        this.title = this.terms.title;
        this.globalNav.hideNavBar();
      }
    });
  }

  onAccept(): void {
    this.modalCtrl.dismiss({ termsAccepted: true });
  }

  onDecline(): void {
    this.modalCtrl.dismiss({ termsAccepted: false }).catch(() => this.popoverCtrl.dismiss({ action: null }));
  }

  ngOnDestroy(): void {
    if (this.closeNavbar) {
      this.globalNav.showNavBar();
    }
  }

  onButtonClicked(): void {
    this.popoverCtrl.dismiss({ action: this.buttonText });
  }
}
