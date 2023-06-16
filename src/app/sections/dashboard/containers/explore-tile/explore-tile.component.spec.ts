import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FavoriteMerchantsFacadeService } from '@core/facades/favourite-merchant/favorite-merchants-facade.service';
import { MerchantFacadeService } from '@core/facades/merchant/merchant-facade.service';
import { MenuMerchantFacadeService } from '@core/facades/menu-merchant/menu-merchant-facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { ExploreService } from '@sections/explore/services/explore.service';
import { NavigationService } from '@shared/services/navigation.service';
import { ExploreTileComponent } from './explore-tile.component';

describe('ExploreTileComponent', () => {
  let component: ExploreTileComponent;
  let fixture: ComponentFixture<ExploreTileComponent>;

  beforeEach(() => {
    const favoriteMerchantsFacadeServiceStub = () => ({
      favoriteMerchants$: {}
    });
    const merchantFacadeServiceStub = () => ({ merchants$: {} });
    const menuMerchantFacadeServiceStub = () => ({ menuMerchants$: {} });
    const settingsFacadeServiceStub = () => ({
      getSetting: fOOD_ENABLED => ({})
    });
    const environmentFacadeServiceStub = () => ({});
    const exploreServiceStub = () => ({
      getInitialMerchantData$: () => ({
        pipe: () => ({ subscribe: f => f({}) })
      })
    });
    const navigationServiceStub = () => ({ navigate: array => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ExploreTileComponent],
      providers: [
        {
          provide: FavoriteMerchantsFacadeService,
          useFactory: favoriteMerchantsFacadeServiceStub
        },
        {
          provide: MerchantFacadeService,
          useFactory: merchantFacadeServiceStub
        },
        {
          provide: MenuMerchantFacadeService,
          useFactory: menuMerchantFacadeServiceStub
        },
        {
          provide: SettingsFacadeService,
          useFactory: settingsFacadeServiceStub
        },
        {
          provide: EnvironmentFacadeService,
          useFactory: environmentFacadeServiceStub
        },
        { provide: ExploreService, useFactory: exploreServiceStub },
        { provide: NavigationService, useFactory: navigationServiceStub }
      ]
    });
    fixture = TestBed.createComponent(ExploreTileComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`isLoading has default value`, () => {
    expect(component.isLoading).toEqual(true);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
     jest.spyOn(component, 'getMerchants');
      component.ngOnInit();
      expect(component.getMerchants).toHaveBeenCalled();
    });
  });

  describe('getMerchants', () => {
    it('makes expected calls', () => {
      const exploreServiceStub: ExploreService = fixture.debugElement.injector.get(
        ExploreService
      );
     jest.spyOn(component, 'getFoodSetting');
     jest.spyOn(exploreServiceStub, 'getInitialMerchantData$');
      component.getMerchants();
      expect(component.getFoodSetting).toHaveBeenCalled();
      expect(exploreServiceStub.getInitialMerchantData$).toHaveBeenCalled();
    });
  });

  describe('getFoodSetting', () => {
    it('makes expected calls', () => {
      const settingsFacadeServiceStub: SettingsFacadeService = fixture.debugElement.injector.get(
        SettingsFacadeService
      );
     jest.spyOn(settingsFacadeServiceStub, 'getSetting');
      component.getFoodSetting();
      expect(settingsFacadeServiceStub.getSetting).toHaveBeenCalled();
    });
  });
});
