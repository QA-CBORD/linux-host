import * as Sentry from '@sentry/angular-ivy';
import { EnvironmentData } from '@environments/environment-data';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

const OmitedErrorsForSentry = [
  'Error: Invalid session',
  'Invalid session',
  'Invalid user session',
  'Non-Error exception captured with keys found when loading the app',
  '9017,Order can not be processed for the given due time, it exceeds the merchants order capacity',
  'There was an issue with the transaction'
];
@Injectable({
  providedIn: 'root'
})
export class SentryLoggingHandlerService {

  constructor() { }

  logError(error: Error): void {
    Sentry.captureException(error);
  }

  initProdMode(prodDsn: boolean = true): void {
    if (prodDsn) {
      if (environment.production) {
        this.init("https://bff607c85207d1045f7e872594a3eb7d@o4505981022568448.ingest.sentry.io/4506004113457152");
      }
    } else {
      this.init("https://147d65f03f51061ffccf73dcc0aea126@o4507153434411008.ingest.us.sentry.io/4507154456772608");
    }
  }

  isOmittableError(errorMsg: string): boolean {
    return OmitedErrorsForSentry.some(err =>
      errorMsg && (err.includes(errorMsg) || errorMsg.includes(err))
    );
  }

  private init(dsn: string) {
    Sentry.init({
      dsn,
      release: 'get-mobile@' + EnvironmentData.version.versionNumber,
    });
  }
}
