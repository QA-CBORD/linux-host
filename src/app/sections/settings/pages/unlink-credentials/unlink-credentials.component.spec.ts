import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UnlinkCredentialsComponent } from './unlink-credentials.component';
import { ModalsService } from '@core/service/modals/modals.service';
import { ToastService } from '@core/service/toast/toast.service';
import { MobileCredentialsUnlinkService } from '@shared/ui-components/mobile-credentials/service/mobile-credentials-unlink.service';
import { LoadingService } from '@core/service/loading/loading.service';

describe('UnlinkCredentialsComponent', () => {
  let component: UnlinkCredentialsComponent;
  let fixture: ComponentFixture<UnlinkCredentialsComponent>;

  const mockMobileCredentialsUnlinkService = {
    unlinkCredentials: jest.fn(),
  };

  const mockLoadingService = {
    showSpinner: jest.fn(),
    closeSpinner: jest.fn(),
  };

  const mockModalsService = {
    dismiss: jest.fn(),
  };

  const mockTranslateService = {
    instant: jest.fn(),
  };

  const mockToastService = {
    showSuccessToast: jest.fn(),
    showError: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule, TranslateModule.forRoot()],
      providers: [
        { provide: MobileCredentialsUnlinkService, useValue: mockMobileCredentialsUnlinkService },
        { provide: ModalsService, useValue: mockModalsService },
        { provide: TranslateService, useValue: mockTranslateService },
        { provide: ToastService, useValue: mockToastService },
        { provide: LoadingService, useValue: mockLoadingService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnlinkCredentialsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should unlink credentials and show success toast when unlinked is true', async () => {
    mockMobileCredentialsUnlinkService.unlinkCredentials.mockResolvedValue(true);
    mockTranslateService.instant.mockReturnValue('Some translated text');

    await component.unlink();

    expect(mockMobileCredentialsUnlinkService.unlinkCredentials).toHaveBeenCalled();
    expect(mockToastService.showSuccessToast).toHaveBeenCalledWith({
      message: 'Some translated text',
      position: 'bottom',
    });
    expect(mockModalsService.dismiss).toHaveBeenCalled();
  });

  it('should show error toast when unlinked is false', async () => {
    mockMobileCredentialsUnlinkService.unlinkCredentials.mockResolvedValue(false);
    mockTranslateService.instant.mockReturnValue('Some translated error message');

    await component.unlink();

    expect(mockMobileCredentialsUnlinkService.unlinkCredentials).toHaveBeenCalled();
    expect(mockToastService.showError).toHaveBeenCalledWith('Some translated error message', 4000, 'bottom');
  });
});
