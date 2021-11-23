import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Platform } from '@ionic/angular';

import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { ROLES } from './app.global';

import { Plugins } from '@capacitor/core';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';
import { PATRON_ROUTES } from '@sections/section.config';
import { NativeStartupFacadeService } from '@core/facades/native-startup/native-startup.facade.service';

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
  isMenuNavBarExpanded$: Observable<boolean>;
  isBackdropShown$: Observable<boolean>;

  constructor(
    private readonly platform: Platform,
    private readonly splashScreen: SplashScreen,
    private readonly statusBar: StatusBar,
    private readonly screenOrientation: ScreenOrientation,
    private readonly nativeStartupFacadeService: NativeStartupFacadeService,
    private readonly router: Router,
    private readonly globalNav: GlobalNavService
  ) {}

  ngOnInit(): void {
    this.initEventListeners();
    this.initializeApp();
    this.setPatronsRouteIndicator();
    this.isNavBarShown$ = combineLatest(
      this.globalNav.isNavBarShown$,
      this._isPatronRoute$,
      this._isKeyBoardShown$,
      this.nativeStartupFacadeService.blockGlobalNavigationStatus$
    ).pipe(
      map(
        ([isNavBarShown, isPatronRoute, isKeyBoardShown, isNativeStartupMessageShown]) =>
          isPatronRoute && isNavBarShown && !isKeyBoardShown && !isNativeStartupMessageShown
      )
    );
    this.isMenuNavBarExpanded$ = this.globalNav.isNavBarMenuExpanded$;
    this.isBackdropShown$ = this.globalNav.isBackdropShown$;
  }

  setPatronsRouteIndicator() {
    this._isPatronRoute$ = this.router.events.pipe(
      map(routerEvent => {
        if (routerEvent instanceof NavigationEnd) {
          const route = routerEvent.toString();
          return (
            (route.includes(ROLES.patron) || route.includes(ROLES.guest)) && !route.includes(PATRON_ROUTES.biometric)
          );
        }
      }),
      filter(val => val !== undefined),
      distinctUntilChanged()
    );
  }

  private async initializeApp(): Promise<void> {
    await this.platform.ready();
    this.splashScreen.hide();
    this.statusBar.styleDefault();
    this.statusBar.backgroundColorByHexString('#FFFFFF');
    if (this.platform.is('cordova')) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
  }

  private initEventListeners() {
    if ((this.platform.is('android') || this.platform.is('ios')) && this.platform.is('cordova')) {
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
