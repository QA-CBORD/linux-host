import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalOptions } from '@ionic/core';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';

@Injectable({
  providedIn: 'root',
})
export class ModalsService {
  constructor(private readonly modalController: ModalController, private readonly globalNav: GlobalNavService) {}
  private _lastActionSheetModal: HTMLIonModalElement;

  get lastActionSheetModal(): HTMLIonModalElement {
    return this._lastActionSheetModal;
  }

  async create(opts: ModalOptions, handleNavBarState?: boolean): Promise<HTMLIonModalElement> {
    const modal = await this.modalController.create({ handle: false, backdropDismiss: false, cssClass: 'sc-modal', ...opts });
    this.bindModalListeners(modal, handleNavBarState);
    return modal;
  }

  async createAlert(opts: ModalOptions, handleNavBarState?: boolean): Promise<HTMLIonModalElement> {
    const modal = await this.modalController.create({ handle: false, backdropDismiss: false, cssClass: 'sc-modal sc-modal-alert', ...opts });
    this.bindModalListeners(modal, handleNavBarState);
    return modal;
  }

  async createActionSheet(opts: ModalOptions, handleNavBarState?: boolean): Promise<HTMLIonModalElement> {
    const modal = await this.modalController.create({ handle: false, breakpoints: [1], initialBreakpoint: 1, ...opts });
    this.bindModalListeners(modal, handleNavBarState);
    this._lastActionSheetModal = modal;
    return modal;
  }

  dismiss(data?: object, role?: string, id?: string): Promise<boolean> {
    this._lastActionSheetModal = null;
    return this.modalController.dismiss(data, role, id);
  }

  private bindModalListeners(modal: HTMLIonModalElement, handleNavBarState?: boolean): void {
    modal.addEventListener('ionModalWillPresent', () => {
      this.globalNav.notifyBackdropShown();
      if (handleNavBarState) {
        this.globalNav.hideNavBar();
      }
    });
    modal.addEventListener('ionModalDidPresent', () => {
      document.getElementById('modal-mainTitle')?.focus();
    });
    modal.addEventListener('ionModalDidDismiss', () => {
      this.globalNav.notifyBackdropHidden();
    });
    modal.onWillDismiss().then(() => {
      if (handleNavBarState) {
        this.globalNav.showNavBar();
      }
    });
  }
}
