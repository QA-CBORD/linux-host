import { AlertController } from '@ionic/angular';
import { SentryLoggingHandlerService } from './sentry-logging-handler.service';
import { ErrorHandler, Injectable, inject } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  private sentryLoggingService = inject(SentryLoggingHandlerService);

  constructor(private alertController: AlertController) {}

  handleError(err): void {
    const chunkFailedMessage = /Loading chunk [\d]+ failed/;
    const errText = err ? err.message : 'Unknown error: Error object is empty.';

    if (chunkFailedMessage.test(errText)) {
      this.presentAlertConfirm();
    }

    if (errText && !this.sentryLoggingService.isOmittableError(errText)) {
      this.sentryLoggingService.logError(err);
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
