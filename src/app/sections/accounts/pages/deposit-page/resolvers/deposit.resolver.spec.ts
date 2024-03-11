import { TestBed } from '@angular/core/testing';
import { LoadingService } from 'src/app/core/service/loading/loading.service';
import { DepositService } from '@sections/accounts/services/deposit.service';
import { CommonService } from '@shared/services/common.service';
import { DepositResolver } from './deposit.resolver';
import { first, of, throwError } from 'rxjs';

const loadingServiceMock = {
  showSpinner: jest.fn(),
  closeSpinner: jest.fn(),
};

const depositServiceMock = {
  getUserAccounts: jest.fn().mockReturnValue(of({})),
  getUserSettings: jest.fn().mockReturnValue(of({}))
};

const commonServiceMock = {
  loadContentString: jest.fn().mockReturnValue(of({}))
};

describe('DepositResolver', () => {
  let service: DepositResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DepositResolver,
        { provide: LoadingService, useValue: loadingServiceMock },
        { provide: DepositService, useValue: depositServiceMock },
        { provide: CommonService, useValue: commonServiceMock }
      ]
    });
    service = TestBed.inject(DepositResolver);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('resolve', () => {
    it('makes expected calls', () => {
      service.resolve().pipe(first()).subscribe();
      expect(loadingServiceMock.showSpinner).toHaveBeenCalled();
      expect(depositServiceMock.getUserAccounts).toHaveBeenCalled();
      expect(depositServiceMock.getUserSettings).toHaveBeenCalled();
      expect(commonServiceMock.loadContentString).toHaveBeenCalled();
      expect(loadingServiceMock.closeSpinner).toHaveBeenCalled();
    });

    it('makes expected calls on error', () => {
      depositServiceMock.getUserAccounts.mockReturnValue(throwError(() => new Error('Mock error message')))
      service.resolve().pipe(first()).subscribe();
      expect(commonServiceMock.loadContentString).toHaveBeenCalled();
      expect(loadingServiceMock.showSpinner).toHaveBeenCalled();
      expect(depositServiceMock.getUserAccounts).toHaveBeenCalled();
      expect(loadingServiceMock.closeSpinner).toHaveBeenCalled();
    });
  });
});
