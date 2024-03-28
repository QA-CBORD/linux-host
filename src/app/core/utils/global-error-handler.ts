import { ErrorHandler, Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import * as Sentry from '@sentry/angular-ivy';


const OmitedErrorsForSentry = [
  'Non-Error exception captured with keys found when loading the app',
  'Non-Error exception captured with keys'
];

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private alertController: AlertController) {}
  handleError(err): void {
    const chunkFailedMessage = /Loading chunk [\d]+ failed/;
    const errText = err.message;

    if (chunkFailedMessage.test(err.message)) {
      this.presentAlertConfirm();
    }
    if (errText && !OmitedErrorsForSentry.includes(errText) ) {
      Sentry.captureException(err);
    }

    console.error('Error Handled Global: ', err);
  }

  private async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Oops!',
      message: 'Something went wrong loading your page',
      buttons: [
        {
          text: 'Retry',
          handler: () => window.location.reload(),
        },
      ],
    });

    await alert.present();
  }
}
