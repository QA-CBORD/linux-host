import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  constructor(private loadingController: LoadingController) {}

  async spinnerHandler(started: boolean = false) {
    const loading = await this.loadingController.create({
      message: 'Hellooo',
    });

    if (started) {
      await loading.present();
    } else {
      await loading.dismiss();
    }
  }
}
