import { NgModule, ErrorHandler } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from '@core/core.module';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { StGlobalPopoverModule } from '@shared/ui-components/st-global-popover/st-global-popover.module';
import { GlobalErrorHandler } from '@core/utils/global-error-handler';

@NgModule({
  declarations: [AppComponent],
  imports: [
    StGlobalPopoverModule,
    CoreModule,
    IonicModule.forRoot({ swipeBackEnabled: false }),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [{provide: ErrorHandler, useClass: GlobalErrorHandler}],
  bootstrap: [AppComponent],
})
export class AppModule {}
