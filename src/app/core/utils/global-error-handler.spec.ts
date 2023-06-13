import { TestBed } from '@angular/core/testing';
import { AlertController } from '@ionic/angular';
import { GlobalErrorHandler } from './global-error-handler';

describe('GlobalErrorHandler', () => {
  let service: GlobalErrorHandler;

  beforeEach(() => {
    const alertControllerStub = () => ({
      create: object => ({ present: () => ({}) })
    });
    TestBed.configureTestingModule({
      providers: [
        GlobalErrorHandler,
        { provide: AlertController, useFactory: alertControllerStub }
      ]
    });
    service = TestBed.inject(GlobalErrorHandler);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
