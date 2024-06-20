import { enableProdMode, inject } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from '@environments/environment';
import { SentryLoggingHandlerService } from '@core/utils/sentry-logging-handler.service';

const sentryLoggingService = inject(SentryLoggingHandlerService);

if (environment.production) {
  enableProdMode();
  sentryLoggingService.initSdk();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
