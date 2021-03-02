import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'st-registration-success',
  templateUrl: './registration-success.component.html',
  styleUrls: ['./registration-success.component.scss'],
})
export class RegistrationSuccessComponent implements OnInit {
  title$: Observable<string>;
  message$: Observable<string>;
  @Input() pageContent: { dismissBtnText?: string; resendEmailBtnText?: string } = {};

  constructor(private readonly modalCtrl: ModalController,) {}

  ngOnInit() {
    this.title$ = of('Verify Email');
    this.message$ = of(
      'We have sent you a verification email. Tap the link inside that to verify your email and login.'
    );
  }

  async dismiss(): Promise<void> {
    await this.modalCtrl.dismiss();
  }

  async resend(): Promise<void> {
    // resend email here.
    //this.modalCtrl.dismiss();
  }
}
