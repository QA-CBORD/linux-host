import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationFacadeSettingsService } from '@shared/ui-components/st-global-navigation/services/navigation-facade-settings.service';
import { NavigationBottomBarElement } from '@core/model/navigation/navigation-bottom-bar-element';
import { NavigationStart, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ModalController, PopoverController } from '@ionic/angular';
import { GlobalNavService } from './services/global-nav.service';
import { filter, map } from 'rxjs/operators';

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
    private readonly popoverController: PopoverController,
    private readonly modalController: ModalController,
    private readonly globalNav: GlobalNavService
  ) {
    this.suscription = this.router.events.pipe(filter(e => e instanceof NavigationStart)).subscribe(async () => {
      try {
        this.isListShown = false;
        await this.popoverController.dismiss();
        await this.modalController.dismiss();
      } catch (error) {
        // TODO: Properly handle exception
      }
    });
  }

  ngOnInit() {
    this.navElements$ = this.navigationSettingsService.settings$;
  }

  toggleListAppearance() {
    this.isListShown = !this.isListShown;
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  getLink(url: string) {
    return `/${url}`;
  }

  get isNavBarHidden$(): Observable<boolean> {
    return this.globalNav.isNavBarShown$.pipe(
      map(isShown => isShown === true)
    );
  }
}
