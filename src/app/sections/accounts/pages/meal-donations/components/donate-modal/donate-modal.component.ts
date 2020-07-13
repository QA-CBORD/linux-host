import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'st-donate-modal',
  templateUrl: './donate-modal.component.html',
  styleUrls: ['./donate-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DonateModalComponent {
  @Input() data;
  @Input() completeMessage$: Observable<string>;
  @Input() headerTitle$: Observable<string>;
  @Input() dialogLabelSuccess$: Observable<string>;
  @Input() buttonDone$: Observable<string>;
  @Input() donateAmount$: Observable<string>;
  @Input() account$: Observable<string>;

  constructor(private readonly modalController: ModalController) {}

  async onClickedDone() {
    await this.modalController.dismiss();
  }
}
