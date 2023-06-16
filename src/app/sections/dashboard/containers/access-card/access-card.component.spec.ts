import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ChangeDetectorRef } from '@angular/core';
import { AccessCardService } from './services/access-card.service';
import { Router } from '@angular/router';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { MobileCredentialFacade } from '@shared/ui-components/mobile-credentials/service/mobile-credential-facade.service';
import { ProfileServiceFacade } from '@shared/services/app.profile.services';
import { BarcodeFacadeService } from '@core/service/barcode/barcode.facade.service';
import { AccessCardComponent } from './access-card.component';

describe('AccessCardComponent', () => {
  let component: AccessCardComponent;
  let fixture: ComponentFixture<AccessCardComponent>;

  beforeEach(() => {
    const domSanitizerStub = () => ({
      bypassSecurityTrustResourceUrl: response => ({})
    });
    const changeDetectorRefStub = () => ({ detectChanges: () => ({}) });
    const accessCardServiceStub = () => ({
      getUserName: () => ({}),
      getUserPhoto: () => ({ pipe: () => ({ subscribe: f => f({}) }) }),
      getInstitutionColor: () => ({ pipe: () => ({}) }),
      getInstitutionName: () => ({}),
      getInstitutionImage: () => ({ pipe: () => ({}) }),
      getInstitutionBackgroundImage: () => ({}),
      isGETMyCardEnabled: () => ({}),
      isMobileAccessEnable: () => ({})
    });
    const routerStub = () => ({ navigate: (array, object) => ({}) });
    const userFacadeServiceStub = () => ({
      getUser$: () => ({ pipe: () => ({ subscribe: f => f({}) }) })
    });
    const mobileCredentialFacadeStub = () => ({
      onDestroy: () => ({}),
      setCredentialStateChangeListener: arg => ({}),
      refreshCredentials: () => ({})
    });
    const profileServiceFacadeStub = () => ({ housingOnlyEnabled: () => ({}) });
    const barcodeFacadeServiceStub = () => ({
      getUserSetting: cASHLESS_KEY => ({}),
      getSetting: sOA_KEY => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AccessCardComponent],
      providers: [
        { provide: DomSanitizer, useFactory: domSanitizerStub },
        { provide: ChangeDetectorRef, useFactory: changeDetectorRefStub },
        { provide: AccessCardService, useFactory: accessCardServiceStub },
        { provide: Router, useFactory: routerStub },
        { provide: UserFacadeService, useFactory: userFacadeServiceStub },
        {
          provide: MobileCredentialFacade,
          useFactory: mobileCredentialFacadeStub
        },
        { provide: ProfileServiceFacade, useFactory: profileServiceFacadeStub },
        { provide: BarcodeFacadeService, useFactory: barcodeFacadeServiceStub }
      ]
    });
    fixture = TestBed.createComponent(AccessCardComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`appleWalletEnabled has default value`, () => {
    expect(component.appleWalletEnabled).toEqual(false);
  });

  it(`appleWalletButtonHidden has default value`, () => {
    expect(component.appleWalletButtonHidden).toEqual(true);
  });

  it(`isLoadingPhoto has default value`, () => {
    expect(component.isLoadingPhoto).toEqual(true);
  });

  it(`mobileCredentialAvailable has default value`, () => {
    expect(component.mobileCredentialAvailable).toEqual(false);
  });

  describe('ngOnDestroy', () => {
    it('makes expected calls', () => {
      const mobileCredentialFacadeStub: MobileCredentialFacade = fixture.debugElement.injector.get(
        MobileCredentialFacade
      );
     jest.spyOn(mobileCredentialFacadeStub, 'onDestroy');
      component.ngOnDestroy();
      expect(mobileCredentialFacadeStub.onDestroy).toHaveBeenCalled();
    });
  });

  describe('ngAfterViewInit', () => {
    it('makes expected calls', () => {
      const mobileCredentialFacadeStub: MobileCredentialFacade = fixture.debugElement.injector.get(
        MobileCredentialFacade
      );
     jest.spyOn(
        mobileCredentialFacadeStub,
        'setCredentialStateChangeListener'
      );
      component.ngAfterViewInit();
      expect(
        mobileCredentialFacadeStub.setCredentialStateChangeListener
      ).toHaveBeenCalled();
    });
  });

  describe('onCredentialStateChanged', () => {
    it('makes expected calls', () => {
      const changeDetectorRefStub: ChangeDetectorRef = fixture.debugElement.injector.get(
        ChangeDetectorRef
      );
     jest.spyOn(changeDetectorRefStub, 'detectChanges');
      component.onCredentialStateChanged();
      expect(changeDetectorRefStub.detectChanges).toHaveBeenCalled();
    });
  });

  describe('ionViewWillEnter', () => {
    it('makes expected calls', () => {
      const mobileCredentialFacadeStub: MobileCredentialFacade = fixture.debugElement.injector.get(
        MobileCredentialFacade
      );
     jest.spyOn(mobileCredentialFacadeStub, 'refreshCredentials');
      component.ionViewWillEnter();
      expect(mobileCredentialFacadeStub.refreshCredentials).toHaveBeenCalled();
    });
  });
});
