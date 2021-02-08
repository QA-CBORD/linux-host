import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalOptions } from '@ionic/core';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';

@Injectable()
export class ModalsService {
  constructor(private readonly modalController: ModalController, private readonly globalNav: GlobalNavService) {}

  async create(opts: ModalOptions): Promise<HTMLIonModalElement> {
    const modal = await this.modalController.create(opts);

    modal.addEventListener('ionModalDidPresent', () => {
      this.globalNav.notifyBackdropShown();
      document.getElementById('modal-mainTitle').focus();
    });
    modal.addEventListener('ionModalDidDismiss', () => this.globalNav.notifyBackdropHidden());

    return modal;
  }
}
