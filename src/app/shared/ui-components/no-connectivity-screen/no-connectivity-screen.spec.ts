import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { NoConnectivityScreen } from './no-connectivity-screen';


describe('NoConnectivityScreen', () => {
  let fixture: NoConnectivityScreen;
  let connectionService, loadingService, modalController, router,
    toastService, commonService, accessCardService, 
    barcodeFacadeService, changeDetector, activatedRoute;
  beforeEach(() => {
    connectionService = {
      networkStatus: jest.fn()
    };
    loadingService = {
      showSpinner: jest.fn(),
      closeSpinner: jest.fn()
    };
    modalController = {
      dismiss: jest.fn()
    }
    fixture = new NoConnectivityScreen(
      connectionService, 
      loadingService,  
      router, 
      toastService, 
      commonService, 
      accessCardService, 
      barcodeFacadeService, 
      changeDetector, activatedRoute, modalController);
  });

  describe('retryOperations', () => {
    beforeEach(() => {
      fixture.retryHandler = { onRetry: async () => true, onScanCode: async () => true };
    })
    it('Should call Handler to retry whatever operation had failed due to network issues: RETRY SUCCESS CASE', (async () => {
      jest.spyOn(fixture.retryHandler, 'onRetry').mockResolvedValue(true);
      await fixture.retryOperations();
      expect(fixture.retryHandler.onRetry).toHaveBeenCalledTimes(1);
      expect(modalController.dismiss).toBeCalledTimes(1);
    }));

    it('Should call Handler to retry whatever operation had failed due to network issues: RETRY FAILED CASE', (async () => {
      jest.spyOn(fixture.retryHandler, 'onRetry').mockResolvedValue(false);
      await fixture.retryOperations();
      expect(modalController.dismiss).not.toBeCalled();
    }));

  });
});