import { enableProdMode, inject, runInInjectionContext } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from '@environments/environment';
import { SentryLoggingHandlerService } from '@core/utils/sentry-logging-handler.service';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then((moduleRef) => {
    runInInjectionContext(moduleRef.injector, () => {
      const sentryLoggingService = inject(SentryLoggingHandlerService);
      sentryLoggingService.initProdMode();
    });
  })
  .catch(err => console.error(err));
