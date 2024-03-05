import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserInfo } from '@core/model/user/user-info.model';
import { UserApiService } from './user-api.service';
import { simpleApiMethodAssert } from 'src/app/testing/helpers/api-helpers';

describe('UserApiService', () => {
  let service: UserApiService;
  let httpTestingController: HttpTestingController;
  const serviceURL = '/json/user';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserApiService],
    });
    service = TestBed.inject(UserApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('updateUserInfo$', () => {
    it('makes expected calls', () => {
      const userInfoStub: UserInfo = <any>{};
      service.updateUserInfo$(userInfoStub).subscribe(res => {
        expect(res).toEqual(userInfoStub);
      });
      const req = httpTestingController.expectOne(serviceURL);
      expect(req.request.method).toEqual('POST');
      req.flush(userInfoStub);
      httpTestingController.verify();
    });
  });

  describe('getUser', () => {
    it('makes expected calls', () => {
      service.getUser().subscribe(res => {
        expect(res).toEqual({});
      });
      const req = httpTestingController.expectOne(serviceURL);
      expect(req.request.method).toEqual('POST');
      req.flush([]);
      httpTestingController.verify();
    });
  });

  describe('getUserAddresses', () => {
    it('makes expected calls', () => {
      jest.spyOn(service, 'getUser');
      service.getUserAddresses().subscribe(res => {
        expect(res).toEqual({});
      });
      expect(service.getUser).toHaveBeenCalled();
      const req = httpTestingController.expectOne(serviceURL);
      expect(req.request.method).toEqual('POST');
      req.flush([]);
      httpTestingController.verify();
    });
  });

  it('makes getUserSettings calls', () => {
    simpleApiMethodAssert<UserApiService>(
      httpTestingController,
      service,
      'getUserSettings',
      [{ settingName: '' }, ''],
      serviceURL
    );
  });
  it('makes saveUserSetting calls', () => {
    simpleApiMethodAssert<UserApiService>(
      httpTestingController,
      service,
      'saveUserSetting',
      [{ settingName: '' }, ''],
      serviceURL
    );
  });
  it('makes getUserPhoto calls', () => {
    simpleApiMethodAssert<UserApiService>(httpTestingController, service, 'getUserPhoto', [], serviceURL);
  });
  it('makes addUserPhoto calls', () => {
    simpleApiMethodAssert<UserApiService>(httpTestingController, service, 'addUserPhoto', [], serviceURL);
  });
  it('makes updateUserPhotoStatus calls', () => {
    simpleApiMethodAssert<UserApiService>(httpTestingController, service, 'updateUserPhotoStatus', [], serviceURL);
  });
  it('makes createUserPin calls', () => {
    simpleApiMethodAssert<UserApiService>(httpTestingController, service, 'createUserPin', [], serviceURL);
  });
  it('makes requestDeposit calls', () => {
    simpleApiMethodAssert<UserApiService>(httpTestingController, service, 'requestDeposit', [], serviceURL);
  });
  it('makes getPhotoListByUserId calls', () => {
    simpleApiMethodAssert<UserApiService>(httpTestingController, service, 'getPhotoListByUserId', [], serviceURL);
  });
  it('makes getFullPhotoListByUserId calls', () => {
    simpleApiMethodAssert<UserApiService>(httpTestingController, service, 'getFullPhotoListByUserId', [], serviceURL);
  });
  it('makes saveNotification$ calls', () => {
    simpleApiMethodAssert<UserApiService>(httpTestingController, service, 'saveNotification$', [], serviceURL);
  });
  it('makes logoutAndRemoveUserNotification$ calls', () => {
    simpleApiMethodAssert<UserApiService>(
      httpTestingController,
      service,
      'logoutAndRemoveUserNotification$',
      [],
      serviceURL
    );
  });
  it('makes reportCard as found calls', () => {
    simpleApiMethodAssert<UserApiService>(httpTestingController, service, 'reportCard$', [false], serviceURL);
  });
  it('makes reportCard as found calls', () => {
    simpleApiMethodAssert<UserApiService>(httpTestingController, service, 'reportCard$', [true], serviceURL);
  });

  it('makes changePassword$ calls', () => {
    simpleApiMethodAssert<UserApiService>(httpTestingController, service, 'changePassword$', ['', ''], serviceURL);
  });

  it('makes retrieveUserIdByCashlessFields calls', () => {
    simpleApiMethodAssert<UserApiService>(
      httpTestingController,
      service,
      'retrieveUserIdByCashlessFields',
      ['', ''],
      serviceURL
    );
  });
});
