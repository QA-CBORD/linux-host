import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { LoadingOptions } from '@ionic/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private readonly maxDuration: number = 30000;
  private isLoading: Boolean = false;

  constructor(private loadingController: LoadingController) {}

  async showSpinner(config: LoadingOptions | string = {}): Promise<void> {
    this.isLoading = true;

    const _class = typeof config === 'string' ? 'white-loading' : 'custom-loading';
    config = typeof config === 'string' ? { message: config } : config;

    config = {
      ...config,
      cssClass: _class, 
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

    await this.loadingController.create(config).then(loader => {
      loader.present().then(() => {
        if (!this.isLoading) {
          this.closeSpinner();
        }
      });
    });
  }

  async closeSpinner(): Promise<void> {
    this.isLoading = false;
    /// check for all loaders and remove them
    let topLoader = await this.loadingController.getTop();

    while (topLoader) {
      (await topLoader.dismiss()) ? (topLoader = await this.loadingController.getTop()) : (topLoader = null);
    }
  }
}
