import { LoadingController } from '@ionic/angular';
import { LoadingOptions } from '@ionic/core';
import { LoadingService } from './loading.service';

jest.mock('@ionic/angular');

describe('LoadingService', () => {
  let service: LoadingService;
  let loadingController: LoadingController;

  beforeEach(() => {
    loadingController = new LoadingController();
    service = new LoadingService(loadingController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('showSpinner', () => {
    it('should call create method with default config', async () => {
      const mockLoader = { present: jest.fn(() => Promise.resolve(true)) };
      jest.spyOn(loadingController, 'create').mockResolvedValueOnce(mockLoader as any);

      await service.showSpinner();

      expect(loadingController.create).toHaveBeenCalledWith({
        showBackdrop: true,
        mode: 'md',
        keyboardClose: true,
        backdropDismiss: false,
        duration: 30000,
        cssClass: 'custom-loading',
      });
      expect(mockLoader.present).toHaveBeenCalled();
    });

    it('should call create method with given config', async () => {
      const mockLoader = { present: jest.fn() };
      jest.spyOn(loadingController, 'create').mockResolvedValueOnce(mockLoader as any);

      const config: LoadingOptions = {
        message: 'Test message',
        duration: 5000,
        cssClass: 'test-class',
      };
      await service.showSpinner(config);

      expect(loadingController.create).toHaveBeenCalledWith({
        showBackdrop: true,
        mode: 'md',
        keyboardClose: true,
        backdropDismiss: false,
        message: 'Test message',
        duration: 5000,
        cssClass: 'test-class',
      });
      expect(mockLoader.present).toHaveBeenCalled();
    });

    it('should close spinner if not loading', async () => {
      const mockLoader = { present: jest.fn().mockResolvedValue(undefined) };
      const mockDismissLoader = { dismiss: jest.fn().mockResolvedValue(true) };
      jest.spyOn(loadingController, 'create').mockResolvedValueOnce(mockLoader as any);
      jest.spyOn(loadingController, 'getTop').mockResolvedValueOnce(mockDismissLoader as any);
      const showSpinnerProm = service.showSpinner();
      await service.closeSpinner();
      await showSpinnerProm;
      expect(mockDismissLoader.dismiss).toHaveBeenCalled();
    });
  });

  describe('closeSpinner', () => {
    it('should close all loaders', async () => {
      const mockLoader1 = { dismiss: jest.fn().mockResolvedValueOnce(true) };
      const mockLoader2 = { dismiss: jest.fn().mockResolvedValueOnce(true) };
      const mockLoader3 = { dismiss: jest.fn().mockResolvedValueOnce(false) };
      jest
        .spyOn(loadingController, 'getTop')
        .mockResolvedValueOnce(mockLoader1 as any)
        .mockResolvedValueOnce(mockLoader2 as any)
        .mockResolvedValueOnce(mockLoader3 as any);

      await service.closeSpinner();

      expect(mockLoader1.dismiss).toHaveBeenCalled();
      expect(mockLoader2.dismiss).toHaveBeenCalled();
      expect(service.notLoading()).toBe(true);
    });

    it('should not call dismiss if there are no loaders', async () => {
      jest.spyOn(loadingController, 'getTop').mockResolvedValueOnce(null);

      await service.closeSpinner();

      expect(loadingController.getTop).toHaveBeenCalled();
    });
  });
});
