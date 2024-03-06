import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { Platform } from '@ionic/angular';
import { ToastService } from '@core/service/toast/toast.service';
import { RewardsApiService } from './rewards-api.service';
import { simpleServiceApiToAssert } from 'src/app/testing/helpers/api-helpers';

describe('RewardsApiService', () => {
  let service: RewardsApiService;
  let httpTestingController: HttpTestingController;
  const serviceUrl = '/json/rewards';
  let serviceAssert: (method: keyof RewardsApiService, params?: any[], serviceURL?: string, httpMethod?: string) => void;

  beforeEach(() => {
    const platformStub = () => ({ is: name => ({}) });
    const toastServiceStub = () => ({ showToast: object => ({}) });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        RewardsApiService,
        { provide: Platform, useFactory: platformStub },
        { provide: ToastService, useFactory: toastServiceStub }
      ]
    });
    service = TestBed.inject(RewardsApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
    serviceAssert = simpleServiceApiToAssert(httpTestingController, service);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it('makes getUserRewardTrackInfo calls', () => {
    serviceAssert('getUserRewardTrackInfo', [], serviceUrl);
  });
});


