import { NgTemplateOutlet, SlicePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { NavigationBottomBarElement } from '@core/model/navigation/navigation-bottom-bar-element';
import { ModalsService } from '@core/service/modals/modals.service';
import { IonicModule, ItemReorderEventDetail } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { StHeaderModule } from '@shared/ui-components';
import { NavigationFacadeSettingsService } from '@shared/ui-components/st-global-navigation/services/navigation-facade-settings.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'st-edit-navigation',
  standalone: true,
  imports: [IonicModule, StHeaderModule, SlicePipe, NgTemplateOutlet, TranslateModule],
  templateUrl: './edit-navigation.component.html',
  styleUrl: './edit-navigation.component.scss',
})
export class EditNavigationComponent implements OnInit {
  async ngOnInit() {
    this.navElements = await lastValueFrom(this.navigationSettingsService.initSettings());
  }
  private readonly modalController = inject(ModalsService);
  private readonly navigationSettingsService = inject(NavigationFacadeSettingsService);

  readonly topNavElements = 4;
  navElements: NavigationBottomBarElement[];

  async onClose() {
    await this.modalController.dismiss();
  }

  async handleReorder({ detail: { from, to }, detail }: CustomEvent<ItemReorderEventDetail>) {
    // We need to check if the item is moving to or from the top nav
    if (to >= this.topNavElements) {
      to--;
    }
    if (from >= this.topNavElements) {
      from--;
    }
    const navElements = this.navElements;
    const movedElement2 = navElements.splice(from, 1)[0];
    navElements.splice(to, 0, movedElement2);
    this.navigationSettingsService.updateConfigState(navElements);
    detail.complete(false);
  }

  trackItems(_index: number, itemNumber: NavigationBottomBarElement) {
    return itemNumber.id;
  }
}
