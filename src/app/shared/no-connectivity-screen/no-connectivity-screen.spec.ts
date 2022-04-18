import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { NoConnectivityScreen } from './no-connectivity-screen';


describe('NoConnectivityScreen', () => {
  let fixture: NoConnectivityScreen;
  let connectionService, loadingService, modalController;
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
    fixture = new NoConnectivityScreen(connectionService, loadingService, modalController);
  });

  describe('Setup component', () => {
    describe('ngOnInit', () => {
      it('Should call onNetworkStatusChanged', () => {
        const onNetworkStatusChangedSpy = jest.spyOn(fixture, 'onNetworkStatusChanged');
        jest.spyOn(connectionService, 'networkStatus').mockReturnValue(of(true));
        fixture.ngOnInit();
        expect(onNetworkStatusChangedSpy).toBeCalledTimes(1);
        expect(connectionService.networkStatus).toHaveBeenCalledWith(200);
      })
    })
  });



  describe('validateComponentInput', () => {
    it('Should throw error: Content Strings must be provided.', () => {
      try {
        fixture.validateComponentInput();
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("Content Strings must be provided.");
      }
    });

    it('Should throw error: retry handler must be provided.', () => {
      try {
        fixture.strings = {} as any;
        fixture.validateComponentInput();
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("retry handler must be provided.");
      }
    });
  });



  describe('retryOperations', () => {
    beforeEach(() => {
      fixture.retryHandler = { onRetry: async () => true };
    })
    it('Should call Handler to retry whatever operation had failed due to network issues: RETRY SUCCESS CASE', (async () => {
      jest.spyOn(fixture.retryHandler, 'onRetry').mockResolvedValue(true);
      await fixture.retryOperations();
      expect(fixture.retryHandler.onRetry).toHaveBeenCalledTimes(1);
      expect(modalController.dismiss).toBeCalledTimes(1);
      expect(loadingService.closeSpinner).toBeCalledTimes(1);
    }));

    it('Should call Handler to retry whatever operation had failed due to network issues: RETRY FAILED CASE', (async () => {
      jest.spyOn(fixture.retryHandler, 'onRetry').mockResolvedValue(false);
      await fixture.retryOperations();
      expect(modalController.dismiss).not.toBeCalled();
      expect(loadingService.closeSpinner).toBeCalledTimes(1);
    }));

  });
});