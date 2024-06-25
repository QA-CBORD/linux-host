import { SentryLoggingHandlerService } from './sentry-logging-handler.service';
import { ORDER_ERROR_CODES, ORDER_VALIDATION_ERRORS } from '@sections/ordering/ordering.config';
import * as Sentry from '@sentry/angular-ivy';
import { TestBed } from '@angular/core/testing';
import { environment } from '@environments/environment';

jest.mock('@sentry/angular-ivy', () => ({
  captureException: jest.fn(),
  init: jest.fn(),
}));

describe('SentryLoggingHandlerService', () => {
  let service: SentryLoggingHandlerService;
  beforeEach(() => {
    service = TestBed.inject(SentryLoggingHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should recognize omittable errors messages', () => {
    expect(service.isOmittableError('Error: Invalid session')).toBeTruthy();
  });

  it('should recognize omittable subtrings of errors messages', () => {
    expect(service.isOmittableError('Order can not be processed for the given due time')).toBeTruthy();
  });

  it('should NOT omit any error', () => {
    expect(service.isOmittableError('Custom Error')).toBeFalsy();
  });

  it('should NOT omit other unknown errors', () => {
    expect(service.isOmittableError(ORDER_VALIDATION_ERRORS[ORDER_ERROR_CODES.INVALID_CARD])).toBeFalsy();
  });

  it('should NOT omit other known errors', () => {
    expect(service.isOmittableError(ORDER_VALIDATION_ERRORS[ORDER_ERROR_CODES.INVALID_ORDER])).toBeFalsy();
  });

  it('should init the SDK with Sentry', () => {
    environment.production = true;
    service.initProdMode();
    expect(Sentry.init).toHaveBeenCalled();
  });

  it('should init the SDK with prod url', () => {
    environment.production = true;
    const spy = jest.spyOn(service as any, 'init');
    service.initProdMode();
    expect(spy).toHaveBeenCalledWith("https://bff607c85207d1045f7e872594a3eb7d@o4505981022568448.ingest.sentry.io/4506004113457152");
  });

  it('should NOT init the SDK with prod url', () => {
    const spy = jest.spyOn(service as any, 'init');
    service.initProdMode(false);
    expect(spy).toHaveBeenCalledWith("https://147d65f03f51061ffccf73dcc0aea126@o4507153434411008.ingest.us.sentry.io/4507154456772608");
  });

  it('should capture error with Sentry', () => {
    service.logError(new Error('Test Error'));
    expect(Sentry.captureException).toHaveBeenCalled();
  });
});
