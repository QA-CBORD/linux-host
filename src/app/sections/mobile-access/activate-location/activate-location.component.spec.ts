import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { MobileAccessService } from '../service';
import { MActivateMobileLocationResult } from '../model';
import { LoadingService } from '@core/service/loading/loading.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CommerceApiService } from '@core/service/commerce/commerce-api.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { ToastService } from '@core/service/toast/toast.service';
import { ActivateLocationComponent } from './activate-location.component';

describe('ActivateLocationComponent', () => {
  let component: ActivateLocationComponent;
  let fixture: ComponentFixture<ActivateLocationComponent>;

  beforeEach(() => {
    const activatedRouteStub = () => ({ snapshot: { params: { id: {} } } });
    const navControllerStub = () => ({ navigateBack: arg => ({}) });
    const popoverControllerStub = () => ({
      create: object => ({
        onDidDismiss: () => ({ then: () => ({}) }),
        present: () => ({})
      })
    });
    const mobileAccessServiceStub = () => ({
      getLocationById: locationId => ({}),
      activateMobileLocation: locationId => ({
        pipe: () => ({ subscribe: f => f({}) })
      }),
      updateFavouritesList: locationId => ({
        pipe: () => ({ subscribe: f => f({}) })
      }),
      getContentValueByName: activateBtn => ({}),
      getInstitutionColor: () => ({ pipe: () => ({}) })
    });
    const loadingServiceStub = () => ({
      showSpinner: object => ({}),
      closeSpinner: () => ({ then: () => ({}) })
    });
    const domSanitizerStub = () => ({
      bypassSecurityTrustResourceUrl: response => ({})
    });
    const commerceApiServiceStub = () => ({ getCashlessUserId: () => ({}) });
    const userFacadeServiceStub = () => ({
      getAcceptedPhoto$: () => ({ pipe: () => ({}) })
    });
    const institutionFacadeServiceStub = () => ({
      cachedInstitutionInfo$: {},
      cachedInstitutionPhoto$: { pipe: () => ({}) }
    });
    const toastServiceStub = () => ({ showToast: object => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ActivateLocationComponent],
      providers: [
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: NavController, useFactory: navControllerStub },
        { provide: PopoverController, useFactory: popoverControllerStub },
        { provide: MobileAccessService, useFactory: mobileAccessServiceStub },
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: DomSanitizer, useFactory: domSanitizerStub },
        { provide: CommerceApiService, useFactory: commerceApiServiceStub },
        { provide: UserFacadeService, useFactory: userFacadeServiceStub },
        {
          provide: InstitutionFacadeService,
          useFactory: institutionFacadeServiceStub
        },
        { provide: ToastService, useFactory: toastServiceStub }
      ]
    });
    fixture = TestBed.createComponent(ActivateLocationComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('modalHandler', () => {
    it('makes expected calls', () => {
      const navControllerStub: NavController = fixture.debugElement.injector.get(
        NavController
      );
      const popoverControllerStub: PopoverController = fixture.debugElement.injector.get(
        PopoverController
      );
      const mActivateMobileLocationResultStub: MActivateMobileLocationResult = <
        any
      >{};
      spyOn(component, 'activateLocation').and.callThrough();
      spyOn(navControllerStub, 'navigateBack').and.callThrough();
      spyOn(popoverControllerStub, 'create').and.callThrough();
      component.modalHandler(mActivateMobileLocationResultStub);
      expect(component.activateLocation).toHaveBeenCalled();
      expect(navControllerStub.navigateBack).toHaveBeenCalled();
      expect(popoverControllerStub.create).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const mobileAccessServiceStub: MobileAccessService = fixture.debugElement.injector.get(
        MobileAccessService
      );
      const commerceApiServiceStub: CommerceApiService = fixture.debugElement.injector.get(
        CommerceApiService
      );
      spyOn(mobileAccessServiceStub, 'getLocationById').and.callThrough();
      spyOn(commerceApiServiceStub, 'getCashlessUserId').and.callThrough();
      component.ngOnInit();
      expect(mobileAccessServiceStub.getLocationById).toHaveBeenCalled();
      expect(commerceApiServiceStub.getCashlessUserId).toHaveBeenCalled();
    });
  });

  describe('activateLocation', () => {
    it('makes expected calls', () => {
      const mobileAccessServiceStub: MobileAccessService = fixture.debugElement.injector.get(
        MobileAccessService
      );
      const loadingServiceStub: LoadingService = fixture.debugElement.injector.get(
        LoadingService
      );
      spyOn(component, 'modalHandler').and.callThrough();
      spyOn(component, 'presentToast').and.callThrough();
      spyOn(
        mobileAccessServiceStub,
        'activateMobileLocation'
      ).and.callThrough();
      spyOn(loadingServiceStub, 'showSpinner').and.callThrough();
      spyOn(loadingServiceStub, 'closeSpinner').and.callThrough();
      component.activateLocation();
      expect(component.modalHandler).toHaveBeenCalled();
      expect(component.presentToast).toHaveBeenCalled();
      expect(mobileAccessServiceStub.activateMobileLocation).toHaveBeenCalled();
      expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
      expect(loadingServiceStub.closeSpinner).toHaveBeenCalled();
    });
  });

  describe('favouriteHandler', () => {
    it('makes expected calls', () => {
      const mobileAccessServiceStub: MobileAccessService = fixture.debugElement.injector.get(
        MobileAccessService
      );
      spyOn(mobileAccessServiceStub, 'updateFavouritesList').and.callThrough();
      component.favouriteHandler();
      expect(mobileAccessServiceStub.updateFavouritesList).toHaveBeenCalled();
    });
  });
});
