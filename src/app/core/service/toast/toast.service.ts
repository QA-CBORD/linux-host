import { Injectable } from '@angular/core';
import { ToastButton, ToastController } from '@ionic/angular';

export interface ToastConfig {
  message: string;
  toastButtons?: ToastButton[];
  position?: 'top' | 'bottom' | 'middle';
  duration?: number;
  onDismiss?: () => void;
  icon?: string;
  cssClass?: string;
  positionAnchor?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly defaultDuration: number = 3000;

  constructor(private readonly toastController: ToastController) { }

  async showToast(toastConfig: ToastConfig) {
    let config: ToastConfig = {
      message: '',
      toastButtons: [],
      position: 'top',
      duration: this.defaultDuration,
      onDismiss: null,
    };

    config = { ...config, ...toastConfig };

    const toast = await this.toastController.create({
      message: config.message,
      duration: config.duration,
      buttons: config.toastButtons,
      position: config.position,
      icon: config.icon,
      cssClass: config.cssClass,
      positionAnchor: config.positionAnchor,
    });
    toast.setAttribute('role', 'alert');

    toast.onDidDismiss().then(() => {
      if (config.onDismiss) {
        config.onDismiss();
      }
    });

    await toast.present();
    return toast;
  }

  async showError(options: ToastConfig) {
    const myToast = await this.toastController.create({
      message: options.message,
      duration: options.duration ?? 5000,
      cssClass: 'toast-message-error',
      mode: 'ios',
      position: options.position ?? 'top',
      positionAnchor: options.positionAnchor,
      buttons: options.toastButtons ?? [
        {
          icon: '/assets/icon/error.svg',
          side: 'start',
          handler: () => myToast.dismiss(false)
        },
        {
          icon: "/assets/icon/close-x.svg",
          handler: () => myToast.dismiss(),
        }
      ],
    });
    myToast.onDidDismiss().then(() => {
      if (options.onDismiss) {
        options.onDismiss();
      }
    });
    myToast.setAttribute('role', 'alert');
    await myToast.present();
  }

  async showSuccessToast(toastConfig: ToastConfig) {
    this.showToast({ ...toastConfig, icon: 'checkmark-circle', cssClass: 'toast-message-success' });
  }

  async showInfo(options: ToastConfig) {
    const myToast = await this.toastController.create({
      message: options.message,
      duration: options.duration ?? 5000,
      cssClass: 'toast-message-notification',
      mode: 'ios',
      position: options.position ?? 'top',
      positionAnchor: options.positionAnchor,
      buttons: options.toastButtons ?? [
        {
          side: 'end',
          icon: "/assets/icon/close-x.svg",
          handler: () => myToast.dismiss(),
        }
      ],
    });
    myToast.onDidDismiss().then(() => {
      if (options.onDismiss) {
        options.onDismiss();
      }
    });
    myToast.setAttribute('role', 'alert');
    await myToast.present();
  }
}
