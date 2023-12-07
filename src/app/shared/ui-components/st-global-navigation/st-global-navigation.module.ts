import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StGlobalNavigationComponent } from '@shared/ui-components/st-global-navigation/st-global-navigation.component';
import { NavigationFacadeSettingsService } from '@shared/ui-components/st-global-navigation/services/navigation-facade-settings.service';
import { PopupListComponent } from '@shared/ui-components/st-global-navigation/components/popup-list/popup-list.component';
import { StopPropagationModule } from '@shared/directives/stop-propogation/stop-propagation.module';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IsActiveRouteInListPipe } from './pipe/is-active-route-in-list.pipe';
import { MainNavItemsPipe } from '@shared/ui-components/st-global-navigation/pipe/main-nav-items.pipe';
import { TranslateModule } from '@ngx-translate/core';

const declarations = [StGlobalNavigationComponent, PopupListComponent, MainNavItemsPipe, IsActiveRouteInListPipe];

@NgModule({
  declarations,
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    StopPropagationModule,
    TranslateModule
  ],
  exports: declarations,
  providers: [NavigationFacadeSettingsService],
})
export class StGlobalNavigationModule {
}
