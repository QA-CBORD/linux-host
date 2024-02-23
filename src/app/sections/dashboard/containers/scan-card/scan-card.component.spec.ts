import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AppStatesFacadeService } from '@core/facades/appEvents/app-events.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { BarcodeFacadeService } from '@core/service/barcode/barcode.facade.service';
import { CommerceApiService } from '@core/service/commerce/commerce-api.service';
import { ScreenBrigtnessService } from '@core/service/screen-brightness/screen-brightness.service';
import { IonicModule } from '@ionic/angular';
import { NavigationService } from '@shared/services/navigation.service';
import { StActivateLocationItemModule } from '@shared/ui-components/st-activate-location-item/st-activate-location-item.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { firstValueFrom, of } from 'rxjs';
import { MockAppEventsService } from 'src/app/testing/mock-services';
import { ScanCardComponent } from './scan-card.component';
import { ScanCardRoutingModule } from './scan-card.routing';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { PronounsPipe } from '@shared/pipes/pronouns-pipe/pronouns.pipe';

const _screenBrigtnessService = {
  setFullBrightness: jest.fn(() => of(true)),
};

const _institutionFacadeService = {};

const _activatedRoute = {
  snapshot: {
    queryParams: {
      color: 'red',
    },
  },
};

const _commerceApiService = {
  getCashlessUserId: jest.fn(() => of()),
};

const _userFacadeService = {
  getUserData$: jest.fn(() => ({ pipe: () => of(true) })),
  getUserInfo: jest.fn(() => of()),
  getAcceptedPhoto$: jest.fn(() => of()),
};

const _barcodeFacadeService = {
  getSetting: jest.fn(() => of()),
  generateBarcode: jest.fn(() => of()),
};

const _navigationService = {};

const _appStatesFacadeService = new MockAppEventsService();

describe('ScanCardPage', () => {
  let component: ScanCardComponent;
  let fixture: ComponentFixture<ScanCardComponent>;

  beforeEach(async () => {
    TestBed.overrideProvider(AppStatesFacadeService, { useValue: new MockAppEventsService() });
    await TestBed.configureTestingModule({
      declarations: [ScanCardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: ScreenBrigtnessService, useValue: _screenBrigtnessService },
        { provide: InstitutionFacadeService, useValue: _institutionFacadeService },
        { provide: ActivatedRoute, useValue: _activatedRoute },
        { provide: CommerceApiService, useValue: _commerceApiService },
        { provide: UserFacadeService, useValue: _userFacadeService },
        { provide: BarcodeFacadeService, useValue: _barcodeFacadeService },
        { provide: NavigationService, useValue: _navigationService },
        {
          provide: StorageStateService,
          useValue: {
            getStateEntityByKey$: jest.fn().mockReturnValue(of(null)),
            updateStateEntity: jest.fn(),
            deleteStateEntityByKey: jest.fn(),
          },
        },
      ],
      imports: [
        IonicModule,
        CommonModule,
        RouterModule,
        StHeaderModule,
        StActivateLocationItemModule,
        ScanCardRoutingModule,
        PronounsPipe
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ScanCardPage', () => {
    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    it('should generate barcode on Init', async () => {
      const spy = jest.spyOn(_barcodeFacadeService, 'generateBarcode');
      await component['initBarcode']();
      expect(spy).toHaveBeenCalled();
    });

    it('should set full brigness OnAppState change', async () => {
      await expect(firstValueFrom(_appStatesFacadeService.getStateChangeEvent$)).resolves.toEqual(
        _appStatesFacadeService.state
      );
    });
  });
});
