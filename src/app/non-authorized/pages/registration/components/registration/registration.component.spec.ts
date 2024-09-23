import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationComponent } from './registration.component';
import { RegistrationServiceFacade } from '../../services/registration-service-facade';
import { ModalController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { Field, FormFieldList, RegistrationContentString } from '../../models/registration-utils';
import { Storage } from '@ionic/storage-angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PopoverController } from '@ionic/angular/standalone';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { NativeProvider } from '@core/provider/native-provider/native.provider';
import { RegistrationService } from '../../services/registration.service';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  const registrationFacadeService = {
    getData: jest.fn().mockResolvedValue({
      fieldList: {
        horizontalAlignedFields: {} as Field[],
        verticalAlignedFields: [] as Field[],
        controls: {} as { [key: string]: any },
      },
      contentString: {} as RegistrationContentString,
    }),
    registrationConfig: jest.fn().mockResolvedValue({}),
    submit: jest.fn(),
  };

  const fb = {
    group: jest.fn(),
  };

  const loadingService = {
    showSpinner: jest.fn(),
    closeSpinner: jest.fn(),
  };

  const modalCtrl = {
    dismiss: jest.fn(),
    create: jest.fn(),
  };

  const toastService = {
    showToast: jest.fn(),
  };
  const popoverControllerMock = {
    create: () => ({
      present: () => Promise.resolve(),
      onDidDismiss: () => Promise.resolve(),
      dismiss: () => Promise.resolve()
    })
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: RegistrationServiceFacade, useValue: registrationFacadeService },
        { provide: FormBuilder, useValue: fb },
        { provide: LoadingService, useValue: loadingService },
        { provide: ModalController, useValue: modalCtrl },
        { provide: ToastService, useValue: toastService },
        { provide: PopoverController, useValue: popoverControllerMock },
        Storage,
      ],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    // registrationFacadeService = TestBed.inject(RegistrationServiceFacade);
    fixture.detectChanges();
  });

  describe('onInit', () => {
    it('should register config', async () => {
      expect(registrationFacadeService.registrationConfig).toHaveBeenCalled();
    });
  });
});
