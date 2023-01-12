import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

export interface ToastConfig {
  message: string;
  toastButtons?: any[];
  position?: 'top' | 'bottom' | 'middle';
  duration?: number;
  onDismiss?: () => any;
  icon?: string;
  cssClass?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly defaultDuration: number = 3000;

  constructor(private readonly toastController: ToastController) {}

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
    });
    toast.setAttribute('role', 'alert');

    toast.onDidDismiss().then(() => {
      if (config.onDismiss) {
        config.onDismiss();
      }
    });

    await toast.present();
  }

  async showError(message: string, duration = 5000) {
    const myToast = await this.toastController.create({
      message,
      duration,
      cssClass: 'toast-message-error',
      mode: 'ios',
      position: 'top',
      buttons: [
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
    myToast.setAttribute('role', 'alert');
    await myToast.present();
  }
}
