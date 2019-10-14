import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'st-deposit-modal',
  templateUrl: './deposit-modal.component.html',
  styleUrls: ['./deposit-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepositModalComponent {
  @Input() data;

  constructor(private readonly modalController: ModalController) {}

  async onClickedDone() {
    await this.modalController.dismiss();
  }
}
