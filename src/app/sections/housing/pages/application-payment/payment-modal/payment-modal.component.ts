import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DepositSuccessCs } from '@sections/accounts/pages/deposit-page/deposit-page.content.string';

@Component({
  selector: 'st-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss'],
})
export class PaymentModalComponent {

  @Input() data;
  @Input() contentString: DepositSuccessCs = {} as any;

  constructor(private readonly modalController: ModalController) {}

  async onClickedDone() {
    await this.modalController.dismiss();
  }

}
