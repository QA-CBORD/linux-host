import { HttpClient, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { Platform } from '@ionic/angular';
import { CONNECTION_TIME_OUT_MESSAGE, NO_INTERNET_STATUS_CODE, STATUS_CODE_SUCCESS } from '@shared/model/generic-constants';
import { of } from 'rxjs';
import { ConnectionService } from './connection-service';
import { ConnectionStatus, Network } from '@capacitor/network';
import { ConnectivityErrorType } from '@shared/ui-components/no-connectivity-screen/model/connectivity-error.enum';

describe(ConnectionService, () => {
  let service: ConnectionService;
  let _httpClient, _environmentFacade, _network, _platform;

  beforeEach(() => {
    _httpClient = {
      head: jest.fn(() =>
        of({
          status: NO_INTERNET_STATUS_CODE,
          statusText: CONNECTION_TIME_OUT_MESSAGE,
        })
      ),
    };
    _environmentFacade = {
      getServicesURL: jest.fn(() => 'www.google.com'),
    };

    _network = {
      type: 'Connected',
      onConnect: jest.fn(() => of({})),
      onDisconnect: jest.fn(() => of({})),
      getStatus: jest.fn()
    };

    _platform = {
      is: jest.fn(() => 'capacitor'),
    };
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: _httpClient },
        { provide: EnvironmentFacadeService, useValue: _environmentFacade },
        { provide: Network, useValue: _network },
        { provide: Platform, useValue: _platform },
      ],
    });

    service = TestBed.inject(ConnectionService);
  });

  afterEach(() => {
    _platform.is.mockReset();
  });

  it('should create the service on mobile', () => {
    _platform.is = jest.fn().mockImplementationOnce(() => 'capacitor');
    expect(service).toBeTruthy();
  });

  it('should continue working on web', () => {
    _platform.is = jest.fn().mockImplementationOnce(() => 'web');
    expect(service).toBeTruthy();
  });

  it('should check network status', () => {
    expect(service.networkStatus(300)).toBeTruthy();
    expect(service.networkStatus(400)).toBeTruthy();
  });

  it('should check is device is offline', async () => {
    _platform.is = jest.fn().mockImplementationOnce(() => 'web');
    Object.defineProperty(service, 'navigator', { onLine: false } as Navigator);
    expect(await service.deviceOffline()).toBeTruthy();
  });

  it('should check is device is online', () => {
    Object.defineProperty(service, 'navigator', { onLine: true } as Navigator);
    expect(service.deviceOffline()).toBeTruthy();
  });

  it('should check device has connection issues', () => {
    expect(service.isConnectionIssues({ message: null, status: NO_INTERNET_STATUS_CODE })).toBeTruthy();
  });

  it('should return SERVER_CONNECTION when server is reachable or not reachable', async () => {
    jest.spyOn(_network, 'getStatus').mockResolvedValue({ connectionType: 'wifi', connected: true } as ConnectionStatus);

    const mockResponse = new HttpResponse({ status: STATUS_CODE_SUCCESS, statusText: String(CONNECTION_TIME_OUT_MESSAGE) });
    jest.spyOn(_httpClient, 'head').mockReturnValue(
      of(mockResponse)
    );

    const result = await service.getOfflineStatus();

    expect(result).toBe(ConnectivityErrorType.SERVER_CONNECTION);
  });
});
