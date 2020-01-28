import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { RoomsFilterModalComponent } from './rooms-filter-modal/rooms-filter-modal.component';

@Component({
  selector: 'st-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFilterComponent {
  constructor(private modalController: ModalController) {}

  openFilterModal(): void {
    this.modalController
      .create({
        component: RoomsFilterModalComponent,
        animated: true,
      })
      .then((modal: HTMLIonModalElement) => {
        modal.present();

        return modal.onDidDismiss();
      });
  }
}
