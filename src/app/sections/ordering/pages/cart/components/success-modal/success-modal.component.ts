import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'st-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SuccessModalComponent {
  @Input() tax: number;
  @Input() checkNumber: number;
  @Input() total: number;
  @Input() accountName: string;
  @Input() deliveryFee: number;
  @Input() pickupFee: number;
  @Input() subTotal: number;
  @Input() tip: number;
  @Input() mealBased: boolean;

  constructor(private readonly modalController: ModalController) {}

  async onClosed() {
    await this.modalController.dismiss();
  }
}
