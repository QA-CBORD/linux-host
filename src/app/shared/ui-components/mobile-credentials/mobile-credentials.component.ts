import { Component, Input, OnInit } from '@angular/core';
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
  @Input() showFooter = true;
  @Input() closeNavbar = true;

  constructor(
    private readonly modalCtrl: ModalController,
    private popoverCtrl: PopoverController
  ) {}

  ngOnInit() {
    setTimeout(() => {
      if (this.terms) {
        this.title = this.terms.title;
      }
    });
  }

  onAccept(): void {
    this.modalCtrl.dismiss({ termsAccepted: true });
  }

  onDecline(): void {
    this.modalCtrl.dismiss({ termsAccepted: false }).catch(() => this.popoverCtrl.dismiss({ action: null }));
  }

  onButtonClicked(): void {
    this.popoverCtrl.dismiss({ action: this.buttonText });
  }
}
