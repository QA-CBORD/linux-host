import { Component, OnInit } from '@angular/core';
import { NavigationFacadeSettingsService } from '@shared/ui-components/st-global-navigation/services/navigation-facade-settings.service';
import { NavigationBottomBarElement } from '@core/model/navigation/navigation-bottom-bar-element';
import { Router } from '@angular/router';
import { PATRON_NAVIGATION } from '../../../app.global';
import { Observable } from 'rxjs';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'st-global-navigation',
  templateUrl: './st-global-navigation.component.html',
  styleUrls: ['./st-global-navigation.component.scss'],
})
export class StGlobalNavigationComponent implements OnInit {
  isListShown: boolean = false;
  navElements$: Observable<NavigationBottomBarElement[]>;
  visibleAmountOfElements: number = 5;

  constructor(private readonly navigationSettingsService: NavigationFacadeSettingsService,
              private readonly router: Router,
              private readonly popoverController: PopoverController) {
  }

  ngOnInit() {
    this.navElements$ = this.navigationSettingsService.settings$;
  }

  toggleListAppearance() {
    this.isListShown = !this.isListShown;
  }

  async navigate(url: PATRON_NAVIGATION | string): Promise<void> {
    try {
      await this.popoverController.dismiss();
    } catch (e) {
      console.log('there is no active overlay at the moment')
    }
    this.isListShown = false;
    await this.router.navigate([url]);
  }
}
