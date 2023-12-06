import { TestBed } from '@angular/core/testing';
import { PopoverController } from '@ionic/angular';
import { firstValueFrom, of, throwError } from 'rxjs';
import { RewardsService } from '../services';
import { LoadingService } from '@core/service/loading/loading.service';
import { RewardsResolverGuard } from '..';

describe('RewardsResolverGuard', () => {
  let guard: RewardsResolverGuard;
  let rewardsServiceMock: { getAllData: jest.Mock };
  let loaderServiceMock: { showSpinner: jest.Mock; closeSpinner: jest.Mock };
  let popoverControllerMock: { create: jest.Mock };

  beforeEach(() => {
    rewardsServiceMock = { getAllData: jest.fn() };
    loaderServiceMock = { showSpinner: jest.fn(), closeSpinner: jest.fn() };
    popoverControllerMock = {
      create: jest.fn().mockResolvedValue({
        onDidDismiss: jest.fn().mockResolvedValue({}),
        present: jest.fn().mockResolvedValue({}),
      }),
    };

    TestBed.configureTestingModule({
      providers: [
        RewardsResolverGuard,
        { provide: RewardsService, useValue: rewardsServiceMock },
        { provide: PopoverController, useValue: popoverControllerMock },
        { provide: LoadingService, useValue: loaderServiceMock },
      ],
    });

    guard = TestBed.inject(RewardsResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('resolve', () => {
    it('should call downloadData', () => {
      const downloadDataSpy = jest.spyOn(guard as any, 'downloadData');
      rewardsServiceMock.getAllData.mockReturnValue(of([null, []]));

      guard.resolve();

      expect(downloadDataSpy).toHaveBeenCalled();
    });
  });

  describe('downloadData', () => {
    it('should call rewardsService.getAllData and show loader', () => {
      rewardsServiceMock.getAllData.mockReturnValue(of([null, []]));

      guard['downloadData']().subscribe();

      expect(rewardsServiceMock.getAllData).toHaveBeenCalledWith(false);
      expect(loaderServiceMock.showSpinner).toHaveBeenCalled();
      expect(loaderServiceMock.closeSpinner).toHaveBeenCalled();
    });

    // it('should handle errors', () => {
    //   rewardsServiceMock.getAllData.mockReturnValue(throwError('error'));

    //   const errorHandlerSpy = jest.spyOn(guard as any, 'errorHandler');
    //   guard['downloadData']().subscribe();

    //   expect(errorHandlerSpy).toHaveBeenCalled();
    // });
  });

  describe('errorHandler', () => {
    it('should create a subject and call modalHandler', () => {
      const subjectNextMock = jest.fn();
      loaderServiceMock.closeSpinner.mockImplementation(() => {});

      guard['errorHandler'](of(null)).subscribe(subjectNextMock);

      expect(popoverControllerMock.create).toHaveBeenCalled();
      expect(loaderServiceMock.closeSpinner).toHaveBeenCalled();
      expect(loaderServiceMock.showSpinner).not.toHaveBeenCalled();
    });
  });
});
