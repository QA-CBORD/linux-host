import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { NativeStartupFacadeService } from '@core/facades/native-startup/native-startup.facade.service';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { IonicModule, Platform } from '@ionic/angular';
import { EditHomePageModalModule } from '@shared/ui-components/edit-home-page-modal/edit-home-page-modal.module';
import { PhoneEmailModule } from '@shared/ui-components/phone-email/phone-email.module';
import { StButtonModule } from '@shared/ui-components/st-button';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { StInputFloatingLabelModule } from '@shared/ui-components/st-input-floating-label/st-input-floating-label.module';
import {  of } from 'rxjs';
import { LocationPermissionModalModule } from './components/location-disclosure/location-disclosure.module';
import {
  ConversationsTileModule,
  ExploreTileModule,
  MobileAccessTileModule,
  OrderTileModule,
  TileWrapperModule,
  TransactionsTileModule,
  RewardsTileModule,
} from './containers';
import { AccessCardModule } from './containers/access-card';
import { AccountsTileModule } from './containers/accounts-tile';
import { HousingTileModule } from './containers/housing-tile/housing-tile.module';
import { MealDonationsTileModule } from './containers/meal-donations-tile/meal-donations-tile.module';
import { DashboardPage } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { TileConfigFacadeService } from './tile-config-facade.service';
import { NavigationFacadeSettingsService } from '@shared/ui-components/st-global-navigation/services/navigation-facade-settings.service';

const _platform = {
  is: jest.fn(),
  pause: { subscribe: jest.fn(() => of(true)) },
  ready: jest.fn(() => ({ then: () => of(true) })),
};

const _nativeStartupFacadeService = {
  fetchNativeStartupInfo: jest.fn(() => of(true)),
};

const _sessionFacadeService = {
  handlePushNotificationRegistration: jest.fn(() => of(true)),
  onLogOutObservable$: { subscribe: () => of(true) },
};

const _tileConfigFacadeService = {
  updateConfigById: jest.fn(() => of(true)),
  resolveAsyncUpdatingConfig: jest.fn(() => of(true)),
};

const _institutionFacadeService = {
  getlastChangedTerms$: jest.fn(() => of(true)),
  cachedInstitutionInfo$: { pipe: jest.fn(() => of(true)) },
};
const _userFacadeService = {
  getUserData$: jest.fn(() => ({  pipe: () => of(true) })),
  getUser$: jest.fn(() => ({  pipe: () => of(true) })),
};

describe('DashboardPage', () => {
  let component: DashboardPage;
  let fixture: ComponentFixture<DashboardPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Platform, useValue: _platform },
        { provide: NativeStartupFacadeService, useValue: _nativeStartupFacadeService },
        { provide: SessionFacadeService, useValue: _sessionFacadeService },
        { provide: TileConfigFacadeService, useValue: _tileConfigFacadeService },
        { provide: InstitutionFacadeService, useValue: _institutionFacadeService },
        { provide: UserFacadeService, useValue: _userFacadeService },
        NavigationFacadeSettingsService,
        AndroidPermissions,
        Network,
        InAppBrowser,
      ],
      imports: [
        CommonModule,
        IonicModule,
        DashboardRoutingModule,
        StHeaderModule,
        AccessCardModule,
        AccountsTileModule,
        ConversationsTileModule,
        ExploreTileModule,
        MobileAccessTileModule,
        OrderTileModule,
        TileWrapperModule,
        TransactionsTileModule,
        RewardsTileModule,
        MealDonationsTileModule,
        HousingTileModule,
        StInputFloatingLabelModule,
        ReactiveFormsModule,
        StButtonModule,
        PhoneEmailModule,
        EditHomePageModalModule,
        LocationPermissionModalModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('App dashboard', () => {
    it('should be created', () => {
      expect(component).toBeTruthy();
    });
    it('should check native starup config', async () => {
      const spy = jest.spyOn(_nativeStartupFacadeService, 'fetchNativeStartupInfo');
      await component['checkNativeStartup']();
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should display modal', async () => {
      const spy = jest.spyOn(component as any, 'initModal');
      await component['checkNativeStartup']();
      expect(spy).toHaveBeenCalledTimes(1);
    });
    it('should register push notifications', async () => {
      const spy = jest.spyOn(_sessionFacadeService, 'handlePushNotificationRegistration');
      component['pushNotificationRegistration']();
      expect(spy).toHaveBeenCalledTimes(5);
    });
    it('should update order strings', async () => {
      const spy = jest.spyOn(_tileConfigFacadeService, 'resolveAsyncUpdatingConfig');
      const spy3 = jest.spyOn(_tileConfigFacadeService, 'updateConfigById');
      await component['updateOrderingStrings']();
      expect(spy).toHaveBeenCalledTimes(11);
      expect(spy3).toHaveBeenCalledTimes(11);
    });

    it('should check stale profile', async () => {
      const spy = jest.spyOn(_userFacadeService, 'getUserData$');
      const spy2 = jest.spyOn(_institutionFacadeService, 'getlastChangedTerms$');
      component['checkStaleProfile']();
      expect(spy).toHaveBeenCalledTimes(13);
      expect(spy2).toHaveBeenCalledTimes(1);
    });
  });
});
