import { TestBed } from '@angular/core/testing';
import { LoadingService } from '@core/service/loading/loading.service';
import { ConnectionFacadeService } from '@shared/services/connection-facade.service';
import { ExecStatus, RetryHandler } from '@shared/ui-components/no-connectivity-screen/model/connectivity-page.model';
import { NavigationService } from '@shared/services/navigation.service';
import { ConnectivityAwareFacadeService } from './connectivity-aware-facade.service';

describe('ConnectivityAwareFacadeService', () => {
  let service: ConnectivityAwareFacadeService;

  const loadingService = {
    showSpinner: jest.fn(),
    closeSpinner: jest.fn(),
  };
  const connectionFacadeService = {
    isModalOpened: jest.fn(),
    setPinModalOpened: jest.fn(),
    isConnectionError: jest.fn(),
    handleConnectionError: jest.fn(),
  };
  const navigationService = {
    navigate: jest.fn(),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConnectivityAwareFacadeService,
        { provide: LoadingService, useValue: loadingService },
        {
          provide: ConnectionFacadeService,
          useValue: connectionFacadeService,
        },
        { provide: NavigationService, useValue: navigationService },
      ],
    });
    service = TestBed.inject(ConnectivityAwareFacadeService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('isModalOpened', () => {
    it('makes expected calls', () => {
      const connectionFacadeServiceStub: ConnectionFacadeService = TestBed.inject(ConnectionFacadeService);
      jest.spyOn(connectionFacadeServiceStub, 'isModalOpened');
      service.isModalOpened();
      expect(connectionFacadeServiceStub.isModalOpened).toHaveBeenCalled();
    });
  });
  it('should run actualMethod and handle loading when showLoading is true', async () => {
    const actualMethod = jest.fn().mockResolvedValue('test');

    const result = await service['run'](actualMethod, true);

    expect(result).toBe('test');
    expect(loadingService.showSpinner).toHaveBeenCalled();
    expect(loadingService.closeSpinner).toHaveBeenCalled();
    expect(actualMethod).toHaveBeenCalled();
  });
  it('should run actualMethod and handle loading when showLoading default', async () => {
    const actualMethod = jest.fn().mockResolvedValue('test');

    const result = await service['run'](actualMethod);

    expect(result).toBe('test');
    expect(loadingService.showSpinner).toHaveBeenCalled();
    expect(loadingService.closeSpinner).toHaveBeenCalled();
    expect(actualMethod).toHaveBeenCalled();
  });
  it('should run actualMethod without handling loading when showLoading is false', async () => {
    const actualMethod = jest.fn().mockResolvedValue('test');

    const result = await service['run'](actualMethod, false);

    expect(result).toBe('test');
    expect(actualMethod).toHaveBeenCalled();
  });
  it('should handle connectivity error', async () => {
    const handler: RetryHandler = jest.fn() as any;

    await service.onConnectivityError(handler, true);

    expect(connectionFacadeService.handleConnectionError).toHaveBeenCalledWith(handler, true);
  });
  it('should handle connectivity error by default', async () => {
    const handler: RetryHandler = jest.fn() as any;

    await service.onConnectivityError(handler);

    expect(connectionFacadeService.handleConnectionError).toHaveBeenCalledWith(handler, true);
  });
  it('should handle connectivity error', async () => {
    const promise = jest.fn().mockResolvedValue('test');
    const rejectOnError = jest.fn();

    const result = await service['handleConnectivityError']({ promise, rejectOnError, shouldNavigate: false }, false);

    expect(connectionFacadeService.handleConnectionError).toHaveBeenCalled();
    expect(result).toEqual({ connectionReEstablished: false, results: null });
  });
  it('should run execution logic successfully', async () => {
    const resolve = jest.fn();
    const reject = jest.fn();
    const promise = jest.fn().mockResolvedValue('test');
    const rejectOnError = jest.fn();
    const run = jest.fn().mockResolvedValue('run result');

    service['run'] = run;

    await service['runExecutionLogic'](
      resolve,
      reject,
      { rejectOnError, promise, showLoading: true, shouldNavigate: false },
      false
    );

    expect(resolve).toHaveBeenCalledWith({ execStatus: ExecStatus.Execution_success, data: 'run result' });
    expect(run).toHaveBeenCalledWith(promise, true);
  });

  it('should run execution logic with error', async () => {
    const resolve = jest.fn();
    const reject = jest.fn();
    const promise = jest.fn().mockResolvedValue('test');
    const rejectOnError = jest.fn().mockReturnValue(true);
    const run = jest.fn().mockRejectedValue('run error');

    service['run'] = run;

    await service['runExecutionLogic'](
      resolve,
      reject,
      { rejectOnError, promise, showLoading: true, shouldNavigate: false },
      false
    );

    expect(reject).toHaveBeenCalledWith('run error');
    expect(run).toHaveBeenCalledWith(promise, true);
  });
  it('should handle connectivity error with connection reestablished', async () => {
    const resolve = jest.fn();
    const reject = jest.fn();
    const promise = jest.fn().mockResolvedValue('test');
    const rejectOnError = jest.fn();
    const run = jest.fn().mockRejectedValue('run error');
    const handleConnectivityError = jest
      .fn()
      .mockResolvedValue({ connectionReEstablished: true, results: 'handle result' });

    service['run'] = run;
    service['handleConnectivityError'] = handleConnectivityError;

    await service['runExecutionLogic'](
      resolve,
      reject,
      { rejectOnError, promise, showLoading: true, shouldNavigate: false },
      false
    );

    expect(resolve).toHaveBeenCalledWith({ execStatus: ExecStatus.Execution_success, data: 'handle result' });
    expect(handleConnectivityError).toHaveBeenCalledWith({ rejectOnError, promise, shouldNavigate: false }, false);
  });

  it('should handle connectivity error without connection reestablished', async () => {
    const resolve = jest.fn();
    const reject = jest.fn();
    const promise = jest.fn().mockResolvedValue('test');
    const rejectOnError = jest.fn();
    const run = jest.fn().mockRejectedValue('run error');
    const handleConnectivityError = jest
      .fn()
      .mockResolvedValue({ connectionReEstablished: false, results: 'handle result' });

    service['run'] = run;
    service['handleConnectivityError'] = handleConnectivityError;

    await service['runExecutionLogic'](
      resolve,
      reject,
      { rejectOnError, promise, showLoading: true, shouldNavigate: false },
      false
    );

    expect(reject).toHaveBeenCalledWith({ connectionReEstablished: false, results: 'handle result' });
    expect(handleConnectivityError).toHaveBeenCalledWith({ rejectOnError, promise, shouldNavigate: false }, false);
  });

  it('should set default options', () => {
    const options = {} as any;

    service['setOptionsDefaults'](options);

    expect(options).toEqual({ showLoading: true, rejectOnError: expect.any(Function) });
  });

  it('should not override existing options', () => {
    const options = { showLoading: false, rejectOnError: () => true } as any;

    service['setOptionsDefaults'](options);

    expect(options).toEqual({ showLoading: false, rejectOnError: expect.any(Function) });
  });

  it('should set pin modal opened', () => {
    const setPinModalOpened = jest.fn();
    connectionFacadeService.setPinModalOpened = setPinModalOpened;

    service.setPinModalOpened(true);

    expect(setPinModalOpened).toHaveBeenCalledWith(true);
  });

  it('should check if error is a connection error', () => {
    const isConnectionError = jest.fn();
    connectionFacadeService.isConnectionError = isConnectionError;

    const error = new Error('test error');
    service['isConnectionError'](error);

    expect(isConnectionError).toHaveBeenCalledWith(error);
  });
  it('should watch for connection issues on exec', async () => {
    const execute = jest.fn();
    const options = { promise: jest.fn().mockResolvedValue('test'), showLoading: true };

    service.execute = execute;

    await service.watchForConnectionIssuesOnExec(options);

    expect(execute).toHaveBeenCalledWith({ ...options, rejectOnError: expect.any(Function) });
  });

  it('should not reject on connection error', async () => {
    const execute = jest.fn();
    const options = { promise: jest.fn().mockResolvedValue('test'), showLoading: true };
    const error = new Error('Connection error');

    service.execute = execute;
    service['isConnectionError'] = jest.fn().mockReturnValue(true);

    await service.watchForConnectionIssuesOnExec(options);

    const rejectOnError = execute.mock.calls[0][0].rejectOnError;
    expect(rejectOnError(error)).toBe(false);
  });

  it('should reject on non-connection error', async () => {
    const execute = jest.fn();
    const options = { promise: jest.fn().mockResolvedValue('test'), showLoading: true };
    const error = new Error('Some other error');

    service.execute = execute;
    service['isConnectionError'] = jest.fn().mockReturnValue(false);

    await service.watchForConnectionIssuesOnExec(options);

    const rejectOnError = execute.mock.calls[0][0].rejectOnError;
    expect(rejectOnError(error)).toBe(true);
  });
  it('should set default rejectOnError', () => {
    const options = { promise: jest.fn() } as any;

    service['setOptionsDefaults'](options);

    expect(typeof options.rejectOnError).toBe('function');
    expect(options.rejectOnError()).toBe(false);
  });
});
