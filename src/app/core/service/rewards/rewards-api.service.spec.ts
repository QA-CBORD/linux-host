import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { Platform } from '@ionic/angular';
import { ToastService } from '@core/service/toast/toast.service';
import { RewardsApiService } from './rewards-api.service';

describe('RewardsApiService', () => {
  let service: RewardsApiService;

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
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
