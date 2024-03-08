import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Platform } from '@ionic/angular';
import { ToastService } from '@core/service/toast/toast.service';
import { RewardsApiService } from './rewards-api.service';
import { MessageResponse, ServiceParameters } from '@core/model/service/message-response.model';
import { of, catchError, throwError } from 'rxjs';
import { UserRewardTrackInfo } from '../models';
import { OPT_IN_STATUS } from '../rewards.config';
import { HttpClient } from '@angular/common/http';

describe('RewardsApiService', () => {
  let service: RewardsApiService;
  const mockToastService = {
    showToast: jest.fn(() => Promise.resolve()),
  };
  const mockPlatform = {
    is: jest.fn().mockReturnValue(false),
  };
  const mockPresentToast = jest.fn();

  const mockResponse: MessageResponse<UserRewardTrackInfo[]> = {
    response: [
      {
        trackID: '',
        trackName: '',
        trackDescription: '',
        trackStartDate: undefined,
        trackEndDate: undefined,
        userOptInStatus: OPT_IN_STATUS.yes,
        userOptInDate: undefined,
        userLevel: 0,
        userCurrentPoints: 0,
        userTotalPointsSpent: 0,
        userExperiencePoints: 0,
        hasLevels: false,
        hasRedeemableRewards: false,
        trackLevels: [],
        accumulationRules: [],
        redeemableRewards: [],
      },
    ],
    exception: null,
  };
  const mockHttp = {
    post: jest.fn().mockReturnValue(of(mockResponse)),
  };
  const mockServiceUrl = 'mockedServiceUrl';
  const mockErrorHandler = jest.fn(showToastOnError => {
    return source =>
      source.pipe(
        catchError(error => {
          if (showToastOnError) {
            // Call your showToast function here
          }
          return throwError(error);
        })
      );
  });
  beforeEach(() => {
    const platformStub = () => ({ is: name => ({}) });
    const toastServiceStub = () => ({ showToast: object => ({}) });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        RewardsApiService,
        { provide: Platform, useFactory: platformStub },
        { provide: ToastService, useFactory: toastServiceStub },
        { provide: ToastService, useValue: mockToastService },
        { provide: Platform, useValue: mockPlatform },
        { provide: HttpClient, useValue: mockHttp },
      ],
    });
    service = TestBed.inject(RewardsApiService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  it('should return user reward track info', () => {
    service.getUserRewardTrackInfo().subscribe(result => {
      expect(result).toEqual(mockResponse.response[0]);
      expect(mockHttp.post).toHaveBeenCalledWith(mockServiceUrl, expect.anything());
      expect(mockErrorHandler).toHaveBeenCalledWith(true);
    });
  });

  it('should handle error without showing toast', () => {
    const mockErrorResponse = { response: null, exception: 'mocked error' };
    mockHttp.post.mockReturnValueOnce(throwError(mockErrorResponse));

    service.getUserRewardTrackInfo(false, false).subscribe({
      error: error => {
        expect(error).toEqual(new Error(mockErrorResponse.exception));
        expect(mockHttp.post).toHaveBeenCalledWith(mockServiceUrl, expect.anything());
        expect(mockErrorHandler).toHaveBeenCalledWith(false);
      },
    });
  });

  it('should throw an error if exception is not null', () => {
    const mockErrorResponse = { response: [], exception: 'An error occurred' };
    mockHttp.post.mockReturnValueOnce(of(mockErrorResponse));

    service.getUserRewardTrackInfo().subscribe({
      error: error => {
        expect(error).toEqual(new Error(mockErrorResponse.exception));
        expect(mockHttp.post).toHaveBeenCalledWith(mockServiceUrl, expect.anything());
        expect(mockErrorHandler).toHaveBeenCalledWith(true);
      },
    });
  });

  it('should return null if response is empty', () => {
    const mockEmptyResponse = { response: [], exception: null };
    mockHttp.post.mockReturnValueOnce(of(mockEmptyResponse));

    service.getUserRewardTrackInfo().subscribe(result => {
      expect(result).toBeNull();
      expect(mockHttp.post).toHaveBeenCalledWith(mockServiceUrl, expect.anything());
      expect(mockErrorHandler).toHaveBeenCalledWith(true);
    });
  });
  it('should present toast at bottom if is nativeEnv', async () => {
    await service['presentToast']();
    jest.spyOn(mockPlatform, 'is').mockReturnValue(true);
    expect(mockToastService.showToast).toHaveBeenCalledWith({
      message: 'Something went wrong - please try again',
      toastButtons: [{ text: 'Dismiss' }],
      position: 'top',
    });
  });

  it('should present toast at bottom if is not nativeEnv', async () => {
    await service['presentToast']();
    jest.spyOn(mockPlatform, 'is').mockReturnValue(false);
    expect(mockToastService.showToast).toHaveBeenCalledWith({
      message: 'Something went wrong - please try again',
      toastButtons: [{ text: 'Dismiss' }],
      position: 'bottom',
    });
  });
  it('should parse response and return response if exception is null', () => {
    const mockResponse = { response: 'mocked response', exception: null };
    const source$ = of(mockResponse);
    service['parseResponse']()(source$).subscribe(result => {
      expect(result).toEqual(mockResponse.response);
    });
  });

  it('should throw an error if exception is not null', () => {
    const mockErrorResponse = { response: null, exception: 'mocked error' };
    const source$ = of(mockErrorResponse);
    service['parseResponse']()(source$).subscribe({
      error: error => {
        expect(error).toEqual(new Error(mockErrorResponse.exception));
      },
    });
  });

  it('should propagate errors if observable emits an error', () => {
    const mockError = new Error('mocked error');
    const source$ = throwError(mockError);
    service['parseResponse']()(source$).subscribe({
      error: error => {
        expect(error).toEqual(mockError);
      },
    });
  });
  it('should call presentToast and propagate error if showToastOnError is true', () => {
    const mockError = new Error('mocked error');
    const source$ = throwError(mockError);
    const mockPresentToast = jest.fn(() => Promise.resolve());
    service['onErrorHandler']()(source$).subscribe({
      error: error => {
        expect(error).toEqual(mockError);
        expect(mockPresentToast).toHaveBeenCalled();
      },
    });
  });

  it('should not call presentToast and propagate error if showToastOnError is false', () => {
    const mockError = new Error('mocked error');
    const source$ = throwError(mockError);
    const mockPresentToast = jest.fn(() => Promise.resolve());
    service['onErrorHandler'](false)(source$).subscribe({
      error: error => {
        expect(error).toEqual(mockError);
        expect(mockPresentToast).not.toHaveBeenCalled();
      },
    });
  });

  it('should propagate error if no error occurs', () => {
    const mockResponse = 'mocked response';
    const source$ = of(mockResponse);
    const mockPresentToast = jest.fn(() => Promise.resolve());
    service['onErrorHandler']()(source$).subscribe(result => {
      expect(result).toEqual(mockResponse);
      expect(mockPresentToast).not.toHaveBeenCalled();
    });
  });

  it('should handle error and show toast if showToast is not provided', () => {
    const mockError = new Error('mocked error');
    const rewardId = 'mockedRewardId';
    mockHttp.post.mockReturnValueOnce(throwError(mockError));
    service.claimReward(rewardId).subscribe({
      error: error => {
        expect(error).toEqual(mockError);
        expect(mockHttp.post).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({ rewardId }));
        expect(mockPresentToast).toHaveBeenCalledWith(true);
      },
    });
  });

  it('should handle error without showing toast if showToast is false', () => {
    const mockError = new Error('mocked error');
    const rewardId = 'mockedRewardId';
    mockHttp.post.mockReturnValueOnce(throwError(mockError));
    service.claimReward(rewardId, false).subscribe({
      error: error => {
        expect(error).toEqual(mockError);
        expect(mockHttp.post).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({ rewardId }));
        expect(mockPresentToast).not.toHaveBeenCalled();
      },
    });
  });


  it('should handle error and show toast if showToastOnError is not provided', () => {
    const mockError = new Error('mocked error');
    const trackId = 'mockedTrackId';
    const userId = 'mockedUserId';
    mockHttp.post.mockReturnValueOnce(throwError(mockError));

    service.optUserIntoRewardTrack(trackId, userId).subscribe({
      error: error => {
        expect(error).toEqual(mockError);
        expect(mockHttp.post).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({ trackId, userId }));
        expect(mockPresentToast).toHaveBeenCalledWith(true);
      },
    });
  });

  it('should handle error without showing toast if showToastOnError is false', () => {
    const mockError = new Error('mocked error');
    const trackId = 'mockedTrackId';
    const userId = 'mockedUserId';
    mockHttp.post.mockReturnValueOnce(throwError(mockError));

    service.optUserIntoRewardTrack(trackId, userId, false).subscribe({
      error: error => {
        expect(error).toEqual(mockError);
        expect(mockHttp.post).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({ trackId, userId }));
        expect(mockPresentToast).not.toHaveBeenCalled();
      },
    });
  });

  it('should handle error and show toast if showToast is not provided', () => {
    const mockError = new Error('mocked error');
    mockHttp.post.mockReturnValueOnce(throwError(mockError));

    service.getUserRewardHistoryInfo().subscribe({
      error: error => {
        expect(error).toEqual(mockError);
        expect(mockPresentToast).toHaveBeenCalledWith(true);
      },
    });
  });

  it('should handle error without showing toast if showToast is false', () => {
    const mockError = new Error('mocked error');
    mockHttp.post.mockReturnValueOnce(throwError(mockError));

    service.getUserRewardHistoryInfo(false).subscribe({
      error: error => {
        expect(error).toEqual(mockError);
        expect(mockPresentToast).not.toHaveBeenCalled();
      },
    });
  });
});


