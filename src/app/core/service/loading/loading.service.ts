import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { LoadingOptions } from '@ionic/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private readonly maxDuration: number = 30000;
  private isLoading = false;

  constructor(private loadingController: LoadingController) {}

  async showSpinner(config: LoadingOptions = {}): Promise<void> {
    this.isLoading = true;

    /// create config
    config = {
      ...config,
      showBackdrop: true,
      mode: 'md',
      keyboardClose: true,
      backdropDismiss: false,
    };

    /// use config param duration value if it exists
    config = config.duration
      ? config
      : {
          ...config,
          duration: this.maxDuration,
        };

    /// This ensures the config param cssClass value is respected AND if a message exists to use the default styling for text visibility
    config =
      config.cssClass || config.message
        ? config
        : {
            ...config,
            cssClass: 'custom-loading',
          };

    const loader = await this.loadingController.create(config);
    await loader.present();
    if (!this.isLoading) {
      this.closeSpinner();
    }
  }
  notLoading = (): boolean => !this.isLoading;

  async closeSpinner(): Promise<void> {
    this.isLoading = false;
    /// check for all loaders and remove them
    let topLoader = await this.loadingController.getTop();

    while (topLoader) {
      const isDimmised = await topLoader.dismiss();

      if (isDimmised) {
        topLoader = await this.loadingController.getTop();
      } else {
        topLoader = null;
      }
    }
  }
}
