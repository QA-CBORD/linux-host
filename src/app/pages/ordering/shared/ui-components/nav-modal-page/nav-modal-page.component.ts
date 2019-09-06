import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'st-nav-modal-page',
  templateUrl: './nav-modal-page.component.html',
  styleUrls: ['./nav-modal-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavModalPage implements OnInit {
  @Input() title: string;
  // @Input() periods: DateUtilObject[];
  // @Input() activeAccountId: string;
  // @Input() activeTimeRange: DateUtilObject;

  constructor(private readonly modalController: ModalController) {}

  ngOnInit() {}

  async onModalClose() {
    await this.modalController.dismiss();
  }
}
