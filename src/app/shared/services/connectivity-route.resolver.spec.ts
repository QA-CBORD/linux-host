import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { LoadingService } from '@core/service/loading/loading.service';
import { ConnectivityPageInfo } from '@shared/ui-components/no-connectivity-screen/model/connectivity-page.model';
import { ConnectivityErrorType } from '@shared/ui-components/no-connectivity-screen/model/no-connectivity.cs.model';
import { of } from 'rxjs';
import { CommonService } from './common.service';
import { ConnectionService } from './connection-service';
import { ConnectivityPageResolver } from './connectivity-route.resolver';

describe(ConnectivityPageResolver, () => {
  let service: ConnectivityPageResolver;
  let route: ActivatedRouteSnapshot;
  let _commonService, _loadingService, _connectionService;

  beforeEach(() => {
    _commonService = {
      loadContentString: jest.fn(() =>
        of({
          csModel: {
            content: {
              hello: 'world',
            },
            doSetup: null,
            valueByKey: () => {},
            params: null,
          } as any,
          errorType: ConnectivityErrorType.SERVER_CONNECTION,
          isVaultLocked: false,
          navBackUrl: '/dashboard',
          retryHandler: {},
          freshContentStringsLoaded: true,
        } as ConnectivityPageInfo)
      ),
    };
    _loadingService = {
      showSpinner: jest.fn(() => Promise.resolve()),
      closeSpinner: jest.fn(() => Promise.resolve()),
    };

    _connectionService = {
      deviceOffline: jest.fn(() => Promise.resolve(false)),
    };

    TestBed.configureTestingModule({
      providers: [
        ConnectivityPageResolver,
        { provide: CommonService, useValue: _commonService },
        { provide: LoadingService, useValue: _loadingService },
        { provide: ConnectionService, useValue: _connectionService },
      ],
    });

    service = TestBed.inject(ConnectivityPageResolver);
    route = new ActivatedRouteSnapshot();
  });

  afterEach(() => {
    _connectionService.deviceOffline.mockReset();
  })

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should resolve data when device offline', () => {
    route.queryParams = { isVaultLocked: false};
    route.data = {};
    service.resolve(route);

    expect(service.resolve(route)).toBeTruthy();
  });

  it('should resolve data when device online', () => {

    _connectionService.deviceOffline = jest.fn(() => Promise.resolve(true)),

    route.queryParams = { isVaultLocked: false};
    route.data = {};
    service.resolve(route);

    expect(service.resolve(route)).toBeTruthy();
  });
});
