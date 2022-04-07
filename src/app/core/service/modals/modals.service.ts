import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalOptions } from '@ionic/core';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';

@Injectable()
export class ModalsService {
  constructor(private readonly modalController: ModalController, private readonly globalNav: GlobalNavService) {}

  async create(opts: ModalOptions, handleNavBarState?: boolean): Promise<HTMLIonModalElement> {
    const modal = await this.modalController.create(opts);

    modal.addEventListener('ionModalWillPresent', () => {
      this.globalNav.notifyBackdropShown();
      if (handleNavBarState) {
         this.globalNav.hideNavBar();
      }
    });
    modal.addEventListener('ionModalDidPresent', () => {
      document.getElementById('modal-mainTitle').focus();
    });
    modal.addEventListener('ionModalDidDismiss', () => {
      this.globalNav.notifyBackdropHidden();
    });
    modal.onWillDismiss().then(() => {
      if (handleNavBarState) {
         this.globalNav.showNavBar();
      }
    });

    return modal;
  }
}
