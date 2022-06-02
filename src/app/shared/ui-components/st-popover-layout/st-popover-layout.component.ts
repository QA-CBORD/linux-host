import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverConfig } from '../../../core/model/popover/popover.model';
import { BUTTON_TYPE } from '../../../core/utils/buttons.config';

@Component({
  selector: 'st-popover-layout',
  templateUrl: './st-popover-layout.component.html',
  styleUrls: ['./st-popover-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StPopoverLayoutComponent {
  @Input() popoverConfig: PopoverConfig<string | number>;

  constructor(private popoverCtrl: PopoverController) {}

  async closeModal(closeModal = 'CANCEL', btnType: string = BUTTON_TYPE.CANCEL) {
    await this.popoverCtrl.dismiss(closeModal, btnType);
  }
}
