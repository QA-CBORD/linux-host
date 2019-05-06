import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { LoadingOptions } from '@ionic/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private readonly maxDuration: number = 15000;
  private loader: HTMLIonLoadingElement = null;

  constructor(private loadingController: LoadingController) {}

  async showSpinner(config: LoadingOptions | string = {}) {
    config = typeof config === 'string' ? { message: config } : config;
    config = config.duration ? config : { ...config, duration: this.maxDuration };

    this.loader = await this.loadingController.create(config);
    this.loader.present();
  }

  async closeSpinner() {
    this.loader && this.loader.dismiss();
    this.loader = null;
  }
}
