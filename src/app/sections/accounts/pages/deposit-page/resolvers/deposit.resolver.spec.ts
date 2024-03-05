import { TestBed } from '@angular/core/testing';
import { LoadingService } from 'src/app/core/service/loading/loading.service';
import { DepositService } from '@sections/accounts/services/deposit.service';
import { CommonService } from '@shared/services/common.service';
import { DepositResolver } from './deposit.resolver';
import { first, of } from 'rxjs';

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
    it('makes expected calls', async () => {
      const depositServiceStub: DepositService = TestBed.inject(DepositService);
      const commonServiceStub: CommonService = TestBed.inject(CommonService);
      jest.spyOn(loadingServiceMock, 'showSpinner');
      jest.spyOn(depositServiceStub, 'getUserAccounts');
      jest.spyOn(depositServiceStub, 'getUserSettings');
      jest.spyOn(commonServiceStub, 'loadContentString');
      service.resolve().pipe(first()).subscribe();
      expect(loadingServiceMock.showSpinner).toHaveBeenCalled();
      expect(depositServiceStub.getUserAccounts).toHaveBeenCalled();
      expect(depositServiceStub.getUserSettings).toHaveBeenCalled();
      expect(commonServiceStub.loadContentString).toHaveBeenCalled();
      expect(loadingServiceMock.closeSpinner).toHaveBeenCalled();
    });
  });
});
