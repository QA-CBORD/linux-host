import { NgModule, ErrorHandler, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from '@core/core.module';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { StGlobalPopoverModule } from '@shared/ui-components/st-global-popover/st-global-popover.module';
import { GlobalErrorHandler } from '@core/utils/global-error-handler';
import { PinModule } from './shared';
import { StGlobalNavigationModule } from '@shared/ui-components/st-global-navigation/st-global-navigation.module';
import { CommonModule } from '@angular/common';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { StNativeStartupPopoverModule } from '@shared/ui-components/st-native-startup-popover/st-native-startup-popover.module';
import { VaultIdentityService } from '@core/service/identity/vault.identity.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import * as Sentry from '@sentry/angular';
import { HttpClient } from '@angular/common/http';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const appInitFactory =
  (vaultService: VaultIdentityService): (() => Promise<void>) =>
  () =>
    vaultService.init();
@NgModule({
  declarations: [AppComponent],
  imports: [
    StNativeStartupPopoverModule,
    StGlobalPopoverModule,
    StGlobalNavigationModule,
    CoreModule,
    AppRoutingModule,
    IonicModule.forRoot({
      swipeBackEnabled: false,
      innerHTMLTemplatesEnabled: true,
    }),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    CommonModule,
    PinModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitFactory,
      deps: [VaultIdentityService, Sentry.TraceService],
      multi: true,
    },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    InAppBrowser,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
