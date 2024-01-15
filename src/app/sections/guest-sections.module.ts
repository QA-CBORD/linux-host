import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestSectionsRoutingModule } from './guest-sections-routing.module';
import { GuestSectionPage } from './guest-sections.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowHideNavbarModule } from '@shared/directives/showhide-navbar/showhide-navbar.module';
import { StGlobalNavigationComponent } from '@shared/ui-components/st-global-navigation/st-global-navigation.component';

@NgModule({
  declarations: [GuestSectionPage],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    GuestSectionsRoutingModule,
    ShowHideNavbarModule,
    StGlobalNavigationComponent,
  ],
})
export class GuestSectionsModule {}
