import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MerchantInfo } from '@sections/ordering';
import { LoadingService } from '@core/service/loading/loading.service';
import { FavoriteMerchantsFacadeService } from '@core/facades/favourite-merchant/favorite-merchants-facade.service';
import { ExploreService } from '@sections/explore/services/explore.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { ToastService } from '@core/service/toast/toast.service';
import { NavigationService } from '@shared/services/navigation.service';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { MerchantDetailsPage } from './merchant-details.page';

describe('MerchantDetailsPage', () => {
  let component: MerchantDetailsPage;
  let fixture: ComponentFixture<MerchantDetailsPage>;

  beforeEach(() => {
    const changeDetectorRefStub = () => ({ detectChanges: () => ({}) });
    const activatedRouteStub = () => ({ snapshot: { params: { id: {} } } });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    const favoriteMerchantsFacadeServiceStub = () => ({
      resolveFavoriteMerchant: merchant => ({
        pipe: () => ({ toPromise: () => ({}) })
      }),
      fetchFavoritesMerchants$: () => ({
        pipe: () => ({ toPromise: () => ({}) })
      })
    });
    const exploreServiceStub = () => ({
      getMerchantById$: merchantId => ({ pipe: () => ({}) }),
      isGuestOrderEnabled: merchant => ({})
    });
    const environmentFacadeServiceStub = () => ({});
    const toastServiceStub = () => ({ showToast: object => ({}) });
    const navigationServiceStub = () => ({ navigate: (array, object) => ({}) });
    const authFacadeServiceStub = () => ({
      isGuestUser: () => ({ toPromise: () => ({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [MerchantDetailsPage],
      providers: [
        { provide: ChangeDetectorRef, useFactory: changeDetectorRefStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: LoadingService, useFactory: loadingServiceStub },
        {
          provide: FavoriteMerchantsFacadeService,
          useFactory: favoriteMerchantsFacadeServiceStub
        },
        { provide: ExploreService, useFactory: exploreServiceStub },
        {
          provide: EnvironmentFacadeService,
          useFactory: environmentFacadeServiceStub
        },
        { provide: ToastService, useFactory: toastServiceStub },
        { provide: NavigationService, useFactory: navigationServiceStub },
        { provide: AuthFacadeService, useFactory: authFacadeServiceStub }
      ]
    });
    fixture = TestBed.createComponent(MerchantDetailsPage);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`isHoursHidden has default value`, () => {
    expect(component.isHoursHidden).toEqual(true);
  });

  it(`isNotesHidden has default value`, () => {
    expect(component.isNotesHidden).toEqual(true);
  });

  it(`guestOrderEnabled has default value`, () => {
    expect(component.guestOrderEnabled).toEqual(true);
  });

  it(`filledStarPath has default value`, () => {
    expect(component.filledStarPath).toEqual(`/assets/icon/star-filled.svg`);
  });

  it(`blankStarPath has default value`, () => {
    expect(component.blankStarPath).toEqual(`/assets/icon/star-outline.svg`);
  });

  describe('onFavoriteTrigger', () => {
    it('makes expected calls', () => {
      const merchantInfoStub: MerchantInfo = <any>{};
      const loadingServiceStub: LoadingService = fixture.debugElement.injector.get(
        LoadingService
      );
      const favoriteMerchantsFacadeServiceStub: FavoriteMerchantsFacadeService = fixture.debugElement.injector.get(
        FavoriteMerchantsFacadeService
      );
      spyOn(loadingServiceStub, 'showSpinner').and.callThrough();
      spyOn(loadingServiceStub, 'closeSpinner').and.callThrough();
      spyOn(
        favoriteMerchantsFacadeServiceStub,
        'resolveFavoriteMerchant'
      ).and.callThrough();
      spyOn(
        favoriteMerchantsFacadeServiceStub,
        'fetchFavoritesMerchants$'
      ).and.callThrough();
      component.onFavoriteTrigger(merchantInfoStub);
      expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
      expect(loadingServiceStub.closeSpinner).toHaveBeenCalled();
      expect(
        favoriteMerchantsFacadeServiceStub.resolveFavoriteMerchant
      ).toHaveBeenCalled();
      expect(
        favoriteMerchantsFacadeServiceStub.fetchFavoritesMerchants$
      ).toHaveBeenCalled();
    });
  });
});
