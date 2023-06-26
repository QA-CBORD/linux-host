import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { IdentityFacadeService } from '@core/facades/identity/identity.facade.service';
import { BiometricPage } from './biometric.page';

describe('BiometricPage', () => {
  let component: BiometricPage;
  let fixture: ComponentFixture<BiometricPage>;

  beforeEach(() => {
    const routerStub = () => ({
      getCurrentNavigation: () => ({
        extras: { state: { biometricConfig: {} } }
      })
    });
    const identityFacadeServiceStub = () => ({
      _biometricsEnabledUserPreference: {},
      pinLoginSetup: isBiometric => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [BiometricPage],
      providers: [
        { provide: Router, useFactory: routerStub },
        {
          provide: IdentityFacadeService,
          useFactory: identityFacadeServiceStub
        }
      ]
    });
    fixture = TestBed.createComponent(BiometricPage);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`loading has default value`, () => {
    expect(component.loading).toEqual(false);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
     jest.spyOn(routerStub, 'getCurrentNavigation');
      component.ngOnInit();
      expect(routerStub.getCurrentNavigation).toHaveBeenCalled();
    });
  });
});
