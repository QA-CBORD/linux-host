import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';


export interface ToastConfig {
  message: string,
  toastButtons?: any[],
  position?: 'top' | 'bottom' | 'middle',
  duration?: number,
  onDismiss?: () => any,
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
      onDismiss: null
    };

    config = {...config, ...toastConfig};

    const toast = await this.toastController.create({
      message: config.message,
      duration: config.duration,
      buttons: config.toastButtons,
      position: config.position,
    });
    toast.setAttribute('role', 'alert');

    toast.onDidDismiss().then(() => {
      if(config.onDismiss){
        config.onDismiss();
      }
    });

    await toast.present();
  }
}
