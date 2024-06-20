import { HttpHandler, HttpResponse } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { ToastService } from '@core/service/toast/toast.service';
import { ServerError } from './server-error.interceptor';
import { firstValueFrom, of } from 'rxjs';
import { SentryLoggingHandlerService } from '@core/utils/sentry-logging-handler.service';
import { TestBed } from '@angular/core/testing';

jest.mock('@sentry/angular-ivy', () => ({
  captureException: jest.fn(),
}));

const toastService = {
  showToast: jest.fn(),
};

describe('ServerError', () => {
  let service: ServerError;
  let sentryLoggingService: SentryLoggingHandlerService;
  const httpResponseStub = new HttpResponse({ status: 500, statusText: 'Internal Server Error', body: { exception: '9000|Internal Server Error', method: "test" } });
  const httpRequestStub: HttpRequest<any> = new HttpRequest<any>('POST', '/api/data', { method: 'test' });
  const httpHandlerStub: HttpHandler = {
    handle: (req: HttpRequest<any>) => {
      return of(httpResponseStub);
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ServerError,
        { provide: ToastService, useValue: toastService }
      ]
    });
    service = TestBed.inject(ServerError);
    sentryLoggingService = TestBed.inject(SentryLoggingHandlerService);

    jest.clearAllMocks();
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it('should return unexpected error occurred', async () => {
    jest.spyOn(console, 'error');
    const unknownExceptionFormat = new HttpResponse({ status: 500, statusText: 'Internal Server Error', body: { exception: 'Internal Server Error', method: "test" } });
    const httpHandler: HttpHandler = {
      handle: (req: HttpRequest<any>) => {
        return of(unknownExceptionFormat);
      }
    };

    try {
      await firstValueFrom(service.intercept(httpRequestStub, httpHandler));
    } catch (error) {
      expect(console.error).toHaveBeenCalled();
      expect(error.message).toBe('Unexpected error occurred.');
    }
  });

  it('should return internal server error', async () => {
    service.shouldDelegateErrorToCaller = jest.fn().mockReturnValue(false);
    try {
      await firstValueFrom(service.intercept(httpRequestStub, httpHandlerStub));
    } catch (error) {
      expect(error?.message).toBe('9000|Internal Server Error');
    }
  });

  it('should NOT return the invalid session error', async () => {
    const unknownExceptionFormat = new HttpResponse({ status: 500, statusText: 'Internal Server Error', body: { exception: '4001|Invalid session', method: "test" } });
    const httpHandler: HttpHandler = {
      handle: (req: HttpRequest<any>) => {
        return of(unknownExceptionFormat);
      }
    };
    service.shouldDelegateErrorToCaller = jest.fn().mockReturnValue(false);
    const spy = jest.spyOn(sentryLoggingService, 'isOmittableError');
    try {
      await firstValueFrom(service.intercept(httpRequestStub, httpHandler));
      expect(spy).toHaveBeenCalled();
    }
    catch (error) {
      expect(error?.message).not.toBe('4001|Invalid session');
    }
  });
});
