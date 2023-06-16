import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MobileAccessService } from './service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { SearchbarCustomEvent } from '@ionic/angular';
import { NativeProvider } from '@core/provider/native-provider/native.provider';
import { MobileAccessPage } from './mobile-access.page';

describe('MobileAccessPage', () => {
  let component: MobileAccessPage;
  let fixture: ComponentFixture<MobileAccessPage>;

  beforeEach(() => {
    const mobileAccessServiceStub = () => ({
      getLocations: () => ({ pipe: () => ({ subscribe: f => f({}) }) }),
      updateFavouritesList: id => ({ pipe: () => ({ subscribe: f => f({}) }) }),
      getContentValueByName: headerTitle => ({}),
      locations: {}
    });
    const userFacadeServiceStub = () => ({
      getUserData$: () => ({}),
      getAcceptedPhoto$: () => ({ subscribe: f => f({}) })
    });
    const institutionFacadeServiceStub = () => ({
      getInstitutionInfo$: id => ({})
    });
    const nativeProviderStub = () => ({ isMobile: () => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [MobileAccessPage],
      providers: [
        { provide: MobileAccessService, useFactory: mobileAccessServiceStub },
        { provide: UserFacadeService, useFactory: userFacadeServiceStub },
        {
          provide: InstitutionFacadeService,
          useFactory: institutionFacadeServiceStub
        },
        { provide: NativeProvider, useFactory: nativeProviderStub }
      ]
    });
    fixture = TestBed.createComponent(MobileAccessPage);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const userFacadeServiceStub: UserFacadeService = fixture.debugElement.injector.get(
        UserFacadeService
      );
     jest.spyOn(userFacadeServiceStub, 'getUserData$');
      component.ngOnInit();
      expect(userFacadeServiceStub.getUserData$).toHaveBeenCalled();
    });
  });

  describe('onEnterKeyClicked', () => {
    it('makes expected calls', () => {
      const nativeProviderStub: NativeProvider = fixture.debugElement.injector.get(
        NativeProvider
      );
     jest.spyOn(nativeProviderStub, 'isMobile');
      component.onEnterKeyClicked();
      expect(nativeProviderStub.isMobile).toHaveBeenCalled();
    });
  });
});
