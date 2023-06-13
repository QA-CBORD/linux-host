import { TestBed } from '@angular/core/testing';
import { MerchantFacadeService } from '@core/facades/merchant/merchant-facade.service';
import { FavoriteMerchantsFacadeService } from '@core/facades/favourite-merchant/favorite-merchants-facade.service';
import { MenuMerchantFacadeService } from '@core/facades/menu-merchant/menu-merchant-facade.service';
import { MerchantInfo } from '@sections/ordering';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { ExploreService } from './explore.service';

describe('ExploreService', () => {
  let service: ExploreService;

  beforeEach(() => {
    const merchantFacadeServiceStub = () => ({
      isCreditCardSupported: merchant => ({}),
      fetchMerchants$: (options, arg) => ({})
    });
    const favoriteMerchantsFacadeServiceStub = () => ({
      fetchFavoritesMerchants$: () => ({})
    });
    const menuMerchantFacadeServiceStub = () => ({
      fetchMenuMerchant$: (options, arg) => ({})
    });
    const settingsFacadeServiceStub = () => ({
      getSetting: fOOD_ENABLED => ({})
    });
    const authFacadeServiceStub = () => ({
      isGuestUser: () => ({ toPromise: () => ({}) })
    });
    const institutionFacadeServiceStub = () => ({ guestOrderEnabled: {} });
    TestBed.configureTestingModule({
      providers: [
        ExploreService,
        {
          provide: MerchantFacadeService,
          useFactory: merchantFacadeServiceStub
        },
        {
          provide: FavoriteMerchantsFacadeService,
          useFactory: favoriteMerchantsFacadeServiceStub
        },
        {
          provide: MenuMerchantFacadeService,
          useFactory: menuMerchantFacadeServiceStub
        },
        {
          provide: SettingsFacadeService,
          useFactory: settingsFacadeServiceStub
        },
        { provide: AuthFacadeService, useFactory: authFacadeServiceStub },
        {
          provide: InstitutionFacadeService,
          useFactory: institutionFacadeServiceStub
        }
      ]
    });
    service = TestBed.inject(ExploreService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('isGuestOrderEnabled', () => {
    it('makes expected calls', () => {
      const merchantFacadeServiceStub: MerchantFacadeService = TestBed.inject(
        MerchantFacadeService
      );
      const merchantInfoStub: MerchantInfo = <any>{};
      const authFacadeServiceStub: AuthFacadeService = TestBed.inject(
        AuthFacadeService
      );
      spyOn(
        merchantFacadeServiceStub,
        'isCreditCardSupported'
      ).and.callThrough();
      spyOn(authFacadeServiceStub, 'isGuestUser').and.callThrough();
      service.isGuestOrderEnabled(merchantInfoStub);
      expect(
        merchantFacadeServiceStub.isCreditCardSupported
      ).toHaveBeenCalled();
      expect(authFacadeServiceStub.isGuestUser).toHaveBeenCalled();
    });
  });

  describe('getFoodSetting', () => {
    it('makes expected calls', () => {
      const settingsFacadeServiceStub: SettingsFacadeService = TestBed.inject(
        SettingsFacadeService
      );
      spyOn(settingsFacadeServiceStub, 'getSetting').and.callThrough();
      service.getFoodSetting();
      expect(settingsFacadeServiceStub.getSetting).toHaveBeenCalled();
    });
  });

  describe('getInitialMerchantData$', () => {
    it('makes expected calls', () => {
      const merchantFacadeServiceStub: MerchantFacadeService = TestBed.inject(
        MerchantFacadeService
      );
      const favoriteMerchantsFacadeServiceStub: FavoriteMerchantsFacadeService = TestBed.inject(
        FavoriteMerchantsFacadeService
      );
      const menuMerchantFacadeServiceStub: MenuMerchantFacadeService = TestBed.inject(
        MenuMerchantFacadeService
      );
      spyOn(merchantFacadeServiceStub, 'fetchMerchants$').and.callThrough();
      spyOn(
        favoriteMerchantsFacadeServiceStub,
        'fetchFavoritesMerchants$'
      ).and.callThrough();
      spyOn(
        menuMerchantFacadeServiceStub,
        'fetchMenuMerchant$'
      ).and.callThrough();
      service.getInitialMerchantData$();
      expect(merchantFacadeServiceStub.fetchMerchants$).toHaveBeenCalled();
      expect(
        favoriteMerchantsFacadeServiceStub.fetchFavoritesMerchants$
      ).toHaveBeenCalled();
      expect(
        menuMerchantFacadeServiceStub.fetchMenuMerchant$
      ).toHaveBeenCalled();
    });
  });
});
