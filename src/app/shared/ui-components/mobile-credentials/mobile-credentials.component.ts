import { Component, Input, OnInit } from '@angular/core';
import { GlobalNavService } from '../st-global-navigation/services/global-nav.service';
import { ModalController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'st-mobile-credentials',
  templateUrl: './mobile-credentials.component.html',
  styleUrls: ['./mobile-credentials.component.scss'],
})
export class MobileCredentialsComponent implements OnInit {
  @Input() title: string = 'Terms and Conditions';
  @Input() termsAndConditions: Promise<string>;
  @Input() usageInstructions: Promise<string>;
  @Input() btnText: string;

  constructor(
    private globalNav: GlobalNavService,
    private readonly modalCtrl: ModalController,
    private popoverCtrl: PopoverController
  ) {}

  ngOnInit() {
    setTimeout(() => {
      if (this.termsAndConditions) {
        this.globalNav.hideNavBar();
      }
    });
  }

  onAccept(): void {
    this.modalCtrl.dismiss({ termsAccepted: true });
  }

  onDecline(): void {
    this.termsAndConditions ? this.modalCtrl.dismiss({ termsAccepted: false }) : this.popoverCtrl.dismiss({ action: null });
  }

  ngOnDestroy(): void {
    this.globalNav.showNavBar();
  }

  onButtonClicked(): void {
    this.popoverCtrl.dismiss({ action: this.btnText });
  }
}
