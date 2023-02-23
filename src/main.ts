import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from '@environments/environment';
import * as Sentry from '@sentry/angular';

if (environment.production) {
  enableProdMode();
  Sentry.init({
    dsn: 'https://ff4bd36ce77f48328763d7dfc546466d@o1422282.ingest.sentry.io/6769039'
  });
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
