import { ErrorHandler, Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  
	constructor(private alertController: AlertController) {

	}
  handleError(error: any): void {
   const chunkFailedMessage = /Loading chunk [\d]+ failed/;

    if (chunkFailedMessage.test(error.message)) {
      this.presentAlertConfirm();
    }
  }

  private async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Oops!',
      message: 'Something went wrong loading your page',
      buttons: [ {
          text: 'Retry',
          handler: () => window.location.reload()
        }
      ]
    });

    await alert.present();
  }
}