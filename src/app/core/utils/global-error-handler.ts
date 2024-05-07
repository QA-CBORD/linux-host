import { ErrorHandler, Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import * as Sentry from '@sentry/angular-ivy';


const OmitedErrorsForSentry = [
  'Error: Invalid session',
  'Invalid session',
  'Invalid user session',
  'Non-Error exception captured with keys found when loading the app',
  '9017,Order can not be processed for the given due time, it exceeds the merchants order capacity',
];

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private alertController: AlertController) {}
  handleError(err): void {
    const chunkFailedMessage = /Loading chunk [\d]+ failed/;
    const errText = err ? err.message : 'Unknown error: Error object is empty.';

    if (chunkFailedMessage.test(errText)) {
      this.presentAlertConfirm();
    }
    if (errText && !OmitedErrorsForSentry.includes(errText) ) {
      Sentry.captureException(err);
    }

    // eslint-disable-next-line no-console
    console.log('Error Handled Global: ', err);
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
