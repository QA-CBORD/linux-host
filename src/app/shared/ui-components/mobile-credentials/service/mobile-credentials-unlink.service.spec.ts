import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MobileCredentialsUnlinkService } from './mobile-credentials-unlink.service';
import { MobileCredentialDataService } from '../model/shared/mobile-credential-data.service';
import { MobileCredentialFacade } from './mobile-credential-facade.service';

describe('MobileCredentialsUnlinkService', () => {
  let service: MobileCredentialsUnlinkService;

  const mockMobileCredentialFacade = {
    mobileCredentialEnabled$: jest.fn(),
    credentialController: {
      getCredential: jest.fn(),
    },
    refreshCredentials: jest.fn(),
  };

  const mockMobileCredentialDataService = {
    unlinkCredentials$: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MobileCredentialsUnlinkService,
        {
          provide: MobileCredentialFacade,
          useValue: mockMobileCredentialFacade,
        },
        {
          provide: MobileCredentialDataService,
          useValue: mockMobileCredentialDataService,
        },
      ],
    });
    service = TestBed.inject(MobileCredentialsUnlinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('displayUnlinkButton$', () => {
    it('should return true when mobileCredentialFacade is enabled and the credential is provisioned', () => {
      mockMobileCredentialFacade.mobileCredentialEnabled$.mockReturnValue(of(true));
      mockMobileCredentialFacade.credentialController.getCredential.mockReturnValue({
        isProvisioned: () => true,
      });

      service.displayUnlinkButton$.subscribe(result => {
        expect(result).toBe(true);
      });
    });

    it('should return false when mobileCredentialFacade is disabled', () => {
      mockMobileCredentialFacade.mobileCredentialEnabled$.mockReturnValue(of(false));

      service.displayUnlinkButton$.subscribe(result => {
        expect(result).toBe(false);
      });
    });

    it('should return false when mobileCredentialFacade is enabled but the credential is not provisioned', () => {
      mockMobileCredentialFacade.mobileCredentialEnabled$.mockReturnValue(of(true));
      mockMobileCredentialFacade.credentialController.getCredential.mockReturnValue({
        isProvisioned: () => false,
      });

      service.displayUnlinkButton$.subscribe(result => {
        expect(result).toBe(false);
      });
    });
  });

  describe('unlinkCredentials()', () => {
    it('should call mobileCredentialDataService.unlinkCredentials$() and return the result', async () => {
      const expectedResult = true;
      mockMobileCredentialDataService.unlinkCredentials$.mockReturnValue(of(expectedResult));

      const result = await service.unlinkCredentials();

      expect(mockMobileCredentialDataService.unlinkCredentials$).toHaveBeenCalled();
      expect(result).toBe(expectedResult);
    });
  });
});
