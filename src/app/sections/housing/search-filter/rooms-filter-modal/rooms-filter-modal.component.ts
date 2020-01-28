import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'st-rooms-filter-modal',
  templateUrl: './rooms-filter-modal.component.html',
  styleUrls: ['./rooms-filter-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsFilterModalComponent {
  constructor(private modalController: ModalController) {}

  close(): void {
    this.modalController.dismiss();
  }
}
