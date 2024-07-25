import { enableProdMode, inject, runInInjectionContext } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from '@environments/environment';
import { SentryLoggingHandlerService } from '@core/utils/sentry-logging-handler.service';
import { SentryAppStateListenerService } from '@core/utils/sentry-app-state-listener.service';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(moduleRef => {
    runInInjectionContext(moduleRef.injector, () => {
      const sentryLoggingService = inject(SentryLoggingHandlerService);
      const sentryAppStateListenerService = inject(SentryAppStateListenerService);
      sentryLoggingService.initProdMode();
      sentryAppStateListenerService.listenToStateChanges();
    });
  })
  .catch(err => console.error(err));
