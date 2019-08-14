import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'st-deposit-modal',
  templateUrl: './deposit-modal.component.html',
  styleUrls: ['./deposit-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepositModalComponent implements OnInit {
  // @Input() accounts: Observable<UserAccount[]>;
  // @Input() periods: DateUtilObject[];
  // @Input() activeAccountId: string;
  // @Input() activeTimeRange: DateUtilObject;

  constructor(private readonly modalController: ModalController) {}

  ngOnInit() {
  }

  async onClickedDone() {
    await this.modalController.dismiss();
  }
}
