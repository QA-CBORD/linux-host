import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { Platform } from '@ionic/angular';
import { CONNECTION_TIME_OUT_MESSAGE, NO_INTERNET_STATUS_CODE } from '@shared/model/generic-constants';
import { mapTo, Observable, of } from 'rxjs';
import { ConnectionService } from './connection-service';

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

  it('should get the network type', () => {
    expect(service.getNetworkType()).toEqual(_network.type);
  });

  it('should check network status', () => {
    Object.defineProperty(service, 'online$', new Observable(observer => observer.next(true)).pipe(mapTo(true)));
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
});
