import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationFacadeSettingsService } from '@shared/ui-components/st-global-navigation/services/navigation-facade-settings.service';
import { NavigationBottomBarElement } from '@core/model/navigation/navigation-bottom-bar-element';
import { NavigationStart, Router, RouterModule } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { IonicModule, ModalController, PopoverController } from '@ionic/angular';
import { GlobalNavService } from './services/global-nav.service';
import { filter, switchMap } from 'rxjs/operators';
import { MainNavItemsPipe } from './pipe/main-nav-items.pipe';
import { PopupListComponent } from './components/popup-list/popup-list.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { StopPropagationModule } from '@shared/directives/stop-propogation/stop-propagation.module';
import { IsActiveRouteInListPipe } from './pipe/is-active-route-in-list.pipe';
import { TOP_NAV_ELEMENTS } from '@shared/model/generic-constants';
import { ShoppingCartBtnComponent } from './components/shopping-cart-btn/shopping-cart-btn.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    StopPropagationModule,
    TranslateModule,
    PopupListComponent,
    MainNavItemsPipe,
    IsActiveRouteInListPipe,
    ShoppingCartBtnComponent,
  ],
  providers: [NavigationFacadeSettingsService],
  selector: 'st-global-navigation',
  templateUrl: './st-global-navigation.component.html',
  styleUrls: ['./st-global-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StGlobalNavigationComponent implements OnInit, OnDestroy {
  _isListShown = false;
  activitiesCount$: Observable<string>;

  set isListShown(value: boolean) {
    this._isListShown = value;
    this._isListShown ? this.globalNav.expandNavBarMenu() : this.globalNav.collapseNavBarMenu();
  }

  get isListShown(): boolean {
    return this._isListShown;
  }

  navElements$: Observable<NavigationBottomBarElement[]>;
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
        await this.popoverController?.dismiss();
        await this.modalController?.dismiss();
      } catch (error) {
        // TODO: Properly handle exception
      }
    });
  }

  ngOnInit() {
    this.navElements$ = this.navigationSettingsService.settings$;
    this.activitiesCount$ = this.navElements$.pipe(
      switchMap(navElements => {
        const indicatorValueNavEls = navElements.slice(TOP_NAV_ELEMENTS).filter(navEl => !!navEl.indicatorValue$);
        if (indicatorValueNavEls.length) {
          return indicatorValueNavEls[0].indicatorValue$;
        }
        return of('');
      })
    );
  }

  toggleListAppearance() {
    this.isListShown = !this.isListShown;
  }

  onDismissPopup() {
    this.isListShown = false;
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  getLink(url: string) {
    return `/${url}`;
  }
}
