// opt-in.guard.spec.ts
import { UserRewardTrackInfo } from '..';
import { OptInGuard } from './opt-in.guard';
import { EMPTY, Observable, Subject, map, of, throwError } from 'rxjs';

describe('OptInGuard', () => {
  let guard: OptInGuard;
  let mockRewardsService;
  let mockPopoverController;
  let mockApiService;
  let mockUserFacadeService;
  let mockToastService;
  let popoverControllerMock;
  beforeEach(() => {
    mockRewardsService = {
      initContentStringsList: jest.fn(() => of(null)),
      getUserRewardTrackInfo: jest.fn(),
      getContentValueByName: jest.fn(),
    };
    mockPopoverController = {
      create: jest.fn(() =>
        Promise.resolve({ onDidDismiss: jest.fn().mockResolvedValue({}), present: jest.fn().mockResolvedValue({}) })
      ),
    };
    mockApiService = {
      optUserIntoRewardTrack: jest.fn(),
    };
    mockUserFacadeService = {
      getUserData$: jest.fn(() => of({ id: 'user123' })),
    };
    mockToastService = {
      showToast: jest.fn(),
    };
    popoverControllerMock = {
      getTop: jest.fn(),
      dismiss: jest.fn(),
      present: jest.fn(),
    };

    guard = new OptInGuard(
      mockRewardsService,
      mockPopoverController,
      mockApiService,
      mockUserFacadeService,
      mockToastService
    );
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('canActivate should return true when user is opted in', () => {
    const mockUserRewardTrackInfo = { userOptInStatus: 'yes' };
    mockRewardsService.getUserRewardTrackInfo.mockReturnValueOnce(of(mockUserRewardTrackInfo));

    guard.canActivate().subscribe(result => {
      expect(result).toBe(true);
    });
  });

  it('canActivate should throw error when user is not opted in', () => {
    const mockUserRewardTrackInfo = { userOptInStatus: 'no' };
    mockRewardsService.getUserRewardTrackInfo.mockReturnValueOnce(of(mockUserRewardTrackInfo));

    guard.canActivate().subscribe({
      error: error => {
        expect(error).toEqual(mockUserRewardTrackInfo);
      },
    });
  });
  it('should handle error from rewardTrackInfo', () => {
    const mockError = new Error('An error occurred');
    guard['errorHandler'](throwError(mockError)).subscribe({
      error: error => {
        expect(error).toBe(mockError);
      },
    });
  });
  it('should handle empty rewardTrackInfo observable', () => {
    guard['errorHandler'](EMPTY).subscribe({
      complete: () => {
        expect(guard['modalHandler']).not.toHaveBeenCalled();
        expect(guard['callForOptIn']).not.toHaveBeenCalled();
      },
    });
  });
  it('should call modalHandler and callForOptIn', () => {
    const mockRewardTrackInfo = { trackID: 'track123' } as UserRewardTrackInfo;
    const subject = new Subject();
    jest.spyOn(guard as any, 'modalHandler').mockResolvedValue({});
    jest.spyOn(guard as any, 'callForOptIn').mockReturnValue(of(true));

    guard['errorHandler'](of(mockRewardTrackInfo)).subscribe(() => {
      expect(guard['modalHandler']).toHaveBeenCalledWith(subject, mockRewardTrackInfo);
      expect(guard['callForOptIn']).toHaveBeenCalledWith(mockRewardTrackInfo.trackID);
    });

    subject.next(null);
    subject.complete();
  });
});
