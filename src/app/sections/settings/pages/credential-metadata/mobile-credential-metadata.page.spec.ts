import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LoadingService } from '@core/service/loading/loading.service';
import { ModalController } from '@ionic/angular';
import { MobileCredentialFacade } from '@shared/ui-components/mobile-credentials/service/mobile-credential-facade.service';
import { MobileCredentialMetadata } from './mobile-credential-metadata.page';

describe('MobileCredentialMetadata', () => {
  let component: MobileCredentialMetadata;
  let fixture: ComponentFixture<MobileCredentialMetadata>;

  beforeEach(() => {
    const loadingServiceStub = () => ({});
    const modalControllerStub = () => ({
      dismiss: () => ({}),
      create: object => ({ present: () => ({}) })
    });
    const mobileCredentialFacadeStub = () => ({
      deviceState$: {},
      credentialController: {
        contentStringAsync: () => ({
          termString$: {},
          usageDialogString$: { title: {}, mContent: {} }
        })
      }
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [MobileCredentialMetadata],
      providers: [
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: ModalController, useFactory: modalControllerStub },
        {
          provide: MobileCredentialFacade,
          useFactory: mobileCredentialFacadeStub
        }
      ]
    });
    fixture = TestBed.createComponent(MobileCredentialMetadata);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`isHid has default value`, () => {
    expect(component.isHid).toEqual(true);
  });

  describe('close', () => {
    it('makes expected calls', () => {
      const modalControllerStub: ModalController = fixture.debugElement.injector.get(
        ModalController
      );
      spyOn(modalControllerStub, 'dismiss').and.callThrough();
      component.close();
      expect(modalControllerStub.dismiss).toHaveBeenCalled();
    });
  });
});
