import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationFacadeSettingsService } from '@shared/ui-components/st-global-navigation/services/navigation-facade-settings.service';
import { NavigationBottomBarElement } from '@core/model/navigation/navigation-bottom-bar-element';
import { NavigationStart, Router } from '@angular/router';
import { PATRON_NAVIGATION } from '../../../app.global';
import { Observable, Subscription } from 'rxjs';
import { ModalController, NavController, PopoverController } from '@ionic/angular';
import { GlobalNavService } from './services/global-nav.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'st-global-navigation',
  templateUrl: './st-global-navigation.component.html',
  styleUrls: ['./st-global-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StGlobalNavigationComponent implements OnInit, OnDestroy {
  _isListShown = false;

  set isListShown(value: boolean) {
    this._isListShown = value;
    this._isListShown ? this.globalNav.expandNavBarMenu() : this.globalNav.collapseNavBarMenu();
  }

  get isListShown(): boolean {
    return this._isListShown;
  }

  navElements$: Observable<NavigationBottomBarElement[]>;
  navElements: NavigationBottomBarElement[] = [];
  visibleAmountOfElements = 5;
  suscription: Subscription;

  constructor(
    private readonly navigationSettingsService: NavigationFacadeSettingsService,
    private readonly router: Router,
    private readonly navCtrl: NavController,
    private readonly popoverController: PopoverController,
    private readonly modalController: ModalController,
    private readonly globalNav: GlobalNavService
  ) {
    this.suscription = this.router.events
      .pipe(filter(e => e instanceof NavigationStart))
      .subscribe(async () => {
        try {
          await this.popoverController.dismiss();
          await this.modalController.dismiss();
        } catch (error) {
          return;
        }
      });
  }

  ngOnInit() {
    this.navElements$ = this.navigationSettingsService.settings$;
  }

  toggleListAppearance() {
    this.isListShown = !this.isListShown;
  }

  async navigate(url: PATRON_NAVIGATION | string): Promise<void> {
    this.isListShown = false;
    await this.navCtrl.navigateForward([url]);
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  getUrl(url: string) {
    return `/${url}`;
  }
}
