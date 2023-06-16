import { TestBed } from '@angular/core/testing';
import { HttpHandler } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { ToastService } from '@core/service/toast/toast.service';
import { ServerError } from './server-error.interceptor';

describe('ServerError', () => {
  let service: ServerError;

  beforeEach(() => {
    const toastServiceStub = () => ({ showToast: object => ({}) });
    TestBed.configureTestingModule({
      providers: [
        ServerError,
        { provide: ToastService, useFactory: toastServiceStub }
      ]
    });
    service = TestBed.inject(ServerError);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('intercept', () => {
    it('makes expected calls', () => {
      const httpHandlerStub: HttpHandler = <any>{};
      const httpRequestStub: HttpRequest<any> = <any>{};
      jest.spyOn(httpHandlerStub, 'handle');
      service.intercept(httpRequestStub, httpHandlerStub);
      expect(httpHandlerStub.handle).toHaveBeenCalled();
    });
  });
});
