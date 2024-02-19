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
import { IonicModule, Platform, PopoverController } from '@ionic/angular';
import { EditHomePageModalModule } from '@shared/ui-components/edit-home-page-modal/edit-home-page-modal.module';
import { PhoneEmailModule } from '@shared/ui-components/phone-email/phone-email.module';
import { StButtonModule } from '@shared/ui-components/st-button';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { StInputFloatingLabelModule } from '@shared/ui-components/st-input-floating-label/st-input-floating-label.module';
import { of } from 'rxjs';
import { LocationPermissionModalModule } from './components/location-disclosure/location-disclosure.module';
import { RewardsTileModule } from './containers/rewards-tile/rewards-tile.module';
import { TransactionsTileModule } from './containers/transactions-tile/transactions-tile.module';
import { TileWrapperModule } from './containers/tile-wrapper/tile-wrapper.module';
import { MobileAccessTileModule } from './containers/mobile-access-tile/mobile-access-tile.module';
import { ExploreTileModule } from './containers/explore-tile/explore-tile.module';
import { ConversationsTileModule } from './containers/conversations-tile/conversations-tile.module';
import { HousingTileModule } from './containers/housing-tile/housing-tile.module';
import { MealDonationsTileModule } from './containers/meal-donations-tile/meal-donations-tile.module';
import { DashboardPage } from './dashboard.component';
import { TileConfigFacadeService } from './tile-config-facade.service';
import { NavigationFacadeSettingsService } from '@shared/ui-components/st-global-navigation/services/navigation-facade-settings.service';
import { ModalsService } from '@core/service/modals/modals.service';
import { LockDownService } from '@shared/services';
import { mockStorageStateService } from 'src/app/testing/core-providers';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { TranslateService } from '@ngx-translate/core';
import { AccessCardComponent } from './containers/access-card';
import { AccessCardService } from './containers/access-card/services/access-card.service';

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
  getUserData$: jest.fn(() => ({ pipe: () => of(true) })),
  getUser$: jest.fn(() => ({ pipe: () => of(true) })),
};

const _modalService = {
  create: jest.fn().mockResolvedValue({ present: () => Promise.resolve() }),
};

const _lockDownService = {
  loadStringsAndSettings: jest.fn(),
};

const _popoverController = {
  create: jest.fn().mockResolvedValue({ onDidDismiss: () => Promise.resolve(), present: () => Promise.resolve() }),
};

const _translateService = {
  instant: jest.fn(),
};

describe('DashboardPage', () => {
  let component: DashboardPage;
  let fixture: ComponentFixture<DashboardPage>;
  let environmentFacadeService = {
    getStateEntityByKey$: jest.fn().mockReturnValue(of(null)),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      //TODO: Temp fix for Swiper imports, should setup JEST instead
      declarations: [DashboardPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Platform, useValue: _platform },
        { provide: NativeStartupFacadeService, useValue: _nativeStartupFacadeService },
        { provide: SessionFacadeService, useValue: _sessionFacadeService },
        { provide: TileConfigFacadeService, useValue: _tileConfigFacadeService },
        { provide: InstitutionFacadeService, useValue: _institutionFacadeService },
        { provide: UserFacadeService, useValue: _userFacadeService },
        { provide: ModalsService, useValue: _modalService },
        { provide: LockDownService, useValue: _lockDownService },
        { provide: StorageStateService, useValue: mockStorageStateService },
        { provide: EnvironmentFacadeService, useValue: environmentFacadeService },
        { provide: PopoverController, useValue: _popoverController },
        { provide: TranslateService, useValue: _translateService },
        AccessCardService,
        NavigationFacadeSettingsService,
        AndroidPermissions,
        InAppBrowser,
      ],
      imports: [
        CommonModule,
        IonicModule,
        StHeaderModule,
        AccessCardComponent,
        ConversationsTileModule,
        ExploreTileModule,
        MobileAccessTileModule,
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

    it('should open editHomePage modal', async () => {
      const spy = jest.spyOn(_modalService, 'create');
      component['presentEditHomePageModal']();
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should get the setting for lockDown', () => {
      const lockDownSpy = jest.spyOn(_lockDownService, 'loadStringsAndSettings');
      component.ionViewWillEnter();
      expect(lockDownSpy).toHaveBeenCalled();
    });
  });
});
