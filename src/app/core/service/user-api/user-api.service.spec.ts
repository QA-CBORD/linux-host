import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { UserInfo } from '@core/model/user/user-info.model';
import { UserPhotoInfo } from '@core/model/user';
import { UserNotificationInfo } from '@core/model/user';
import { UserApiService } from './user-api.service';

describe('UserApiService', () => {
  let service: UserApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserApiService]
    });
    service = TestBed.inject(UserApiService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('updateUserInfo$', () => {
    it('makes expected calls', () => {
      const userInfoStub: UserInfo = <any>{};
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.updateUserInfo$(userInfoStub).subscribe(res => {
        expect(res).toEqual(userInfoStub);
      });
      const req = httpTestingController.expectOne('/json/user');
      expect(req.request.method).toEqual('POST');
      req.flush(userInfoStub);
      httpTestingController.verify();
    });
  });

  describe('getUser', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.getUser().subscribe(res => {
        expect(res).toEqual({});
      });
      const req = httpTestingController.expectOne('/json/user');
      expect(req.request.method).toEqual('POST');
      req.flush([]);
      httpTestingController.verify();
    });
  });

  describe('getUserAddresses', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
     jest.spyOn(service, 'getUser');
      service.getUserAddresses().subscribe(res => {
        expect(res).toEqual({});
      });
      expect(service.getUser).toHaveBeenCalled();
      const req = httpTestingController.expectOne('/json/user');
      expect(req.request.method).toEqual('POST');
      req.flush([]);
      httpTestingController.verify();
    });
  });
});
