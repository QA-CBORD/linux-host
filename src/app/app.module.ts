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
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Brightness } from '@ionic-native/brightness/ngx';
import { VaultIdentityService } from '@core/service/identity/vault.identity.service';

const appInitFactory = (vaultService: VaultIdentityService): (() => Promise<void>) => () => vaultService.init();
@NgModule({
  declarations: [AppComponent],
  imports: [
    StNativeStartupPopoverModule,
    StGlobalPopoverModule,
    StGlobalNavigationModule,
    CoreModule,
    AppRoutingModule,
    IonicModule.forRoot({ swipeBackEnabled: false }),
    IonicStorageModule.forRoot(),
    CommonModule,
    PinModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitFactory,
      deps: [VaultIdentityService],
      multi: true,
    },
    { provide: ErrorHandler, useClass: GlobalErrorHandler }, InAppBrowser, Network, Brightness
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
