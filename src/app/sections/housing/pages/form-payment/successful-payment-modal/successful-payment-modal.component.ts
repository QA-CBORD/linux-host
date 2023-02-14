import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HousingService } from '@sections/housing/housing.service';

@Component({
  selector: 'st-payment-modal',
  templateUrl: './successful-payment-modal.component.html',
  styleUrls: ['./successful-payment-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessfulPaymentModal implements OnInit {
  @Input() data: any;
  @Input() contentString: any;
  @Input() title: string;

  constructor(private readonly modalController: ModalController, private housingService: HousingService) {}

  ngOnInit(): void {
    this.setContentString();
  }

  async onDoneClicked() {
    this.housingService.goToDashboard();
    await this.modalController.dismiss();
  }

  private setContentString() {
    this.contentString = {
      title: 'Payment successful.',
      amount: 'Amount',
      account: 'Account',
      paymentMethod: 'Payment method',
      endingIn: 'ending in',
    };
  }
}