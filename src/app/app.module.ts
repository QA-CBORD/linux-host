import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [CoreModule, IonicModule.forRoot(), IonicStorageModule.forRoot(), AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
