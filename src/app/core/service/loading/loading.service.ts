import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { LoadingOptions } from '@ionic/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private readonly maxDuration: number = 30000;
  private loader: HTMLIonLoadingElement = null;

  constructor(private loadingController: LoadingController) {}

  async showSpinner(config: LoadingOptions | string = {}): Promise<void> {
    config = typeof config === 'string' ? { message: config } : config;
    config = {
      ...config,
      cssClass: 'custom-loading',
      showBackdrop: true,
      mode: 'md',
      keyboardClose: true,
    };
    config = config.duration
      ? config
      : {
          ...config,
          duration: this.maxDuration,
        };
    if (this.loader !== null) await this.closeSpinner();
    this.loader = await this.loadingController.create(config);
    await this.loader.present();
  }

  async closeSpinner(): Promise<void> {
    /// check for all loaders and remove them
    let topLoader = await this.loadingController.getTop();
    while (topLoader) {
      (await topLoader.dismiss()) ? (topLoader = await this.loadingController.getTop()) : (topLoader = null);
    }

    /// dismiss the local loader if it still exists
    this.loader && (await this.loader.dismiss());

    /// reset loader state
    this.loader = null;
  }
}
