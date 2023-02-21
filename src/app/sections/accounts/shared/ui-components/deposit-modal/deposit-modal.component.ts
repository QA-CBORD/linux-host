import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DepositSuccessCs } from '@sections/accounts/pages/deposit-page/deposit-page.content.string';

@Component({
  selector: 'st-deposit-modal',
  templateUrl: './deposit-modal.component.html',
  styleUrls: ['./deposit-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepositModalComponent {
  @Input() data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() contentString: DepositSuccessCs = {} as any;

  constructor(private readonly modalController: ModalController) {}

  async onClickedDone() {
    await this.modalController.dismiss();
  }
}
