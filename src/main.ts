import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from '@environments/environment';
import * as Sentry from '@sentry/angular-ivy';
import { EnvironmentData } from '@environments/environment-data';

if (environment.production) {
  enableProdMode();
  Sentry.init({
    dsn: 'https://bff607c85207d1045f7e872594a3eb7d@o4505981022568448.ingest.sentry.io/4506004113457152',
    release: 'get-mobile@' + EnvironmentData.version.versionNumber,
    integrations: [new Sentry.Replay()],
    tracesSampleRate: 0.2,
    replaysOnErrorSampleRate: 1.0,
  });
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
