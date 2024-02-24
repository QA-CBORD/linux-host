import { Subscription } from 'rxjs';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PhoneEmailComponent } from './phone-email.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { ModalsService } from '@core/service/modals/modals.service';
import { ToastService } from '@core/service/toast/toast.service';
import { ChangeDetectorRef } from '@angular/core';
import { StButtonModule } from '../st-button';
import { StInputFloatingLabelModule } from '../st-input-floating-label/st-input-floating-label.module';
import { StHeaderModule } from '../st-header';
import { StAlertBannerComponent } from '../st-alert-banner/st-alert-banner.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FocusNextModule } from '@shared/directives/focus-next/focus-next.module';
import { Storage } from '@ionic/storage-angular';
import { TranslateServiceStub } from '@sections/notifications/notifications.component.spec';
import { of } from 'rxjs';
import { UserLocalProfileService } from '@shared/services/user-local-profile/user-local-profile.service';

const mockUserLocalProfileService = {
  userLocalProfileSignal: () => ({ pronouns: 'pronouns' }),
  updatePronouns: jest.fn(),
};

const mockUserFacadeService = {
  getUserData$: jest.fn().mockReturnValue(of({})),
  getUser$: jest.fn().mockReturnValue(of({})),
  getAcceptedPhoto$: jest.fn().mockReturnValue(of({})),
  saveUser$: jest.fn().mockReturnValue(of({})),
};

const mockToastService = {
  showToast: jest.fn(),
};

const mockModalsService = {
  dismiss: jest.fn(),
};

const mockContentStringsFacadeService = {
  fetchContentString$: jest.fn(),
};

jest.mock('rxjs', () => ({
  ...jest.requireActual('rxjs'),
  lastValueFrom: () => ({
    firstName: 'nm',
    lastName: 'ln',
    middleName: 'mn',
    email: 'em@cbord.com',
    phone: '+2121440000',
  }),
}));

describe('PhoneEmailComponent', () => {
  let component: PhoneEmailComponent;
  let fixture: ComponentFixture<PhoneEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        StButtonModule,
        StInputFloatingLabelModule,
        StHeaderModule,
        StAlertBannerComponent,
        FocusNextModule,
        TranslateModule,
        PhoneEmailComponent,
        HttpClientTestingModule,
      ],
      providers: [
        FormBuilder,
        ChangeDetectorRef,
        Storage,
        { provide: ContentStringsFacadeService, useValue: mockContentStringsFacadeService },
        { provide: ModalsService, useValue: mockModalsService },
        { provide: ToastService, useValue: mockToastService },
        { provide: UserFacadeService, useValue: mockUserFacadeService },
        { provide: TranslateService, useClass: TranslateServiceStub },
        { provide: UserLocalProfileService, useValue: mockUserLocalProfileService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.phoneEmailForm).toBeDefined();
    expect(component.phoneEmailForm.get('phone')).toBeDefined();
    expect(component.phoneEmailForm.get('email')).toBeDefined();
  });

  it('should check the field value', () => {
    const field = component.phoneEmailForm.get('email');
    const value = 'john.doe@example.com';
    component['checkFieldValue'](field, value);
    expect(field.value).toBe(value);
  });

  it('should update the form control value', () => {
    const newValue = '1234567890';
    const field = updateFormControl(component, newValue);
    expect(field.value).toBe(newValue);
  });

  it('should invalidate the form control value with less than 10 digits', () => {
    const newValue = '1234567';
    const field = updateFormControl(component, newValue);
    expect(field.invalid).toBeTruthy();
  });

  it('should validate the form control value with 10 digits or more digits', () => {
    const newValue = '01234567689012';
    const field = updateFormControl(component, newValue);
    expect(field.invalid).toBeFalsy();
  });

  it('should validate the form control value with 10 digits or more digits and plus sign infront', () => {
    const newValue = '+01234567689012';
    const field = updateFormControl(component, newValue);
    expect(field.invalid).toBeFalsy();
  });
  
  it('should invalidate the form control value with more than 22 digits', () => {
    const newValue = '012345676890123456456789000';
    const field = updateFormControl(component, newValue);
    expect(field.invalid).toBeTruthy();
  });

  it('should close', () => {
    const spy = jest.spyOn(component['modalController'], 'dismiss');
    component.close();
    expect(spy).toHaveBeenCalled();
  });
});

function updateFormControl(component: PhoneEmailComponent, newValue: string) {
    const field = component.phoneEmailForm.get('phone');
    component['updatePhoneNumber'](newValue);
    return field;
}
