import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonCard, IonButton, IonCardContent, IonIcon, IonCardHeader } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'st-delete-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonCardHeader, IonIcon, IonCardContent, IonButton, IonCard, TranslateModule],
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent {
  @Input() govtIdRequired: boolean;
  constructor(private modalController: ModalController) {}

  async dismissModal(data: boolean) {
    await this.modalController.dismiss(data);
  }

  deletePhoto() {
    this.dismissModal(true);
  }
}
