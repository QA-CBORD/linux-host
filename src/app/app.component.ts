import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform, PopoverController } from '@ionic/angular';

import { App, AppState } from '@capacitor/core';

import { StGlobalPopoverComponent } from '@shared/ui-components';
import { BUTTON_TYPE } from '@core/utils/buttons.config';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { ROLES } from './app.global';
import { IdentityFacadeService } from '@core/facades/identity/identity.facade.service';
import { GUEST_ROUTES } from './non-authorized/non-authorized.config';
import { Plugins } from '@capacitor/core';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';
import { PATRON_ROUTES } from '@sections/section.config';

const { Keyboard } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  preserveWhitespaces: true,
})
export class AppComponent implements OnInit {
  private _isPatronRoute$: Observable<boolean>;
  private _isKeyBoardShown$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isNavBarShown$: Observable<boolean>;

  constructor(
    private readonly platform: Platform,
    private readonly splashScreen: SplashScreen,
    private readonly statusBar: StatusBar,
    private readonly popoverCtrl: PopoverController,
    private readonly identityFacadeService: IdentityFacadeService,
    private readonly router: Router,
    private readonly cdRef: ChangeDetectorRef,
    private readonly globalNav: GlobalNavService
  ) {}

  ngOnInit(): void {
    this.initEventListeners();
    this.initializeApp();
    this.setPatronsRouteIndicator();
    this.isNavBarShown$ = combineLatest(
      this.globalNav.isNavBarShown$,
      this._isPatronRoute$,
      this._isKeyBoardShown$
    ).pipe(
      map(([isNavBarShown, isPatronRoute, isKeyBoardShown]) => isPatronRoute && isNavBarShown && !isKeyBoardShown)
    );
  }

  setPatronsRouteIndicator() {
    this._isPatronRoute$ = this.router.events.pipe(
      map(routerEvent => {
        if (routerEvent instanceof NavigationEnd) {
          const route = routerEvent.toString();
          return route.includes(ROLES.patron) && !route.includes(PATRON_ROUTES.biometric);
        }
      }),
      filter(val => val !== undefined),
      distinctUntilChanged()
    );
  }

  private async initializeApp(): Promise<void> {
    await this.platform.ready();
    this.statusBar.styleDefault();
    this.splashScreen.hide();

    App.addListener('appStateChange', ({ isActive }: AppState) => {
      // state.isActive contains the active state
      console.log('App state changed. Is active?', isActive);

      if (isActive) {
        if (this.identityFacadeService.isVaultLocked) {
          this.router.navigate([ROLES.guest, GUEST_ROUTES.startup], { replaceUrl: true });
        }
      }
    });
  }

  private initEventListeners() {
    if (this.platform.is('android') || this.platform.is('ios') || this.platform.is('cordova')) {
      this.initMobileListeners();
    }
  }

  private initMobileListeners() {
    Keyboard.addListener('keyboardWillShow', () => {
      this._isKeyBoardShown$.next(true);
    });
    Keyboard.addListener('keyboardWillHide', () => {
      this._isKeyBoardShown$.next(false);
    });
  }
}
