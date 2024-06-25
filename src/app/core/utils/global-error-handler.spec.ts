import { AlertController } from '@ionic/angular';
import * as Sentry from '@sentry/angular-ivy';
import { GlobalErrorHandler } from './global-error-handler';
import { TestBed } from '@angular/core/testing';

jest.mock('@sentry/angular-ivy', () => ({
  captureException: jest.fn(),
}));

describe('GlobalErrorHandler', () => {
  let globalErrorHandler: GlobalErrorHandler;
  let alertController: jest.Mocked<AlertController>;

  beforeEach(() => {
    alertController = {
      create: jest.fn().mockResolvedValue({
        present: jest.fn(), // Mock the present method as well
      }),
    } as any;

    TestBed.configureTestingModule({
      providers: [GlobalErrorHandler, { provide: AlertController, useValue: alertController }],
    });

    globalErrorHandler = TestBed.inject(GlobalErrorHandler);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(globalErrorHandler).toBeTruthy();
  });

  describe('handleError', () => {
    it('should call presentAlertConfirm when error message matches chunkFailedMessage', async () => {
      const err = { message: 'Loading chunk 123 failed' };
      globalErrorHandler.handleError(err);
      expect(alertController.create).toHaveBeenCalled();
    });

    it('should call Sentry.captureException when error message does not match chunkFailedMessage', () => {
      const err = { message: 'Some other error message' };
      globalErrorHandler.handleError(err);
      expect(Sentry.captureException).toHaveBeenCalledWith(err);
    });

    it('should not call Sentry.captureException when error message contains specific text', () => {
      const err = { message: 'Non-Error exception captured with keys found when loading the app' };
      globalErrorHandler.handleError(err);
      expect(Sentry.captureException).not.toHaveBeenCalled();
    });

    it('should log error to console', () => {
      const err = { message: 'Some error message' };
      const consoleSpy = jest.spyOn(console, 'error');
      globalErrorHandler.handleError(err);
      expect(consoleSpy).toHaveBeenCalledWith('handleGlobalException: ', err);
    });
  });
});
