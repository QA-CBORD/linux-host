import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'st-payment-modal',
  templateUrl: './successful-payment-modal.component.html',
  styleUrls: ['./successful-payment-modal.component.scss'],
})
export class SuccessfulPaymentModal implements OnInit {
  @Input() data;
  @Input() contentString: any;

  constructor(private readonly modalController: ModalController) {}

  ngOnInit(): void {
    this.setContentString();
  }

  async onClickedDone() {
    await this.modalController.dismiss();
  }

  private setContentString() {
    this.contentString = {
      title: 'Fee payment successful.',
      amount: 'Amount',
      account: 'Account',
      paymentMethod: 'Payment method',
      endingIn: 'ending in'
    };
  }
}
