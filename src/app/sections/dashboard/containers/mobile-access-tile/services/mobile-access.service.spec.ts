import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { CoordsService } from '@core/service/coords/coords.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { MobileAccessService } from './mobile-access.service';

describe('MobileAccessService', () => {
  let service: MobileAccessService;

  beforeEach(() => {
    const coordsServiceStub = () => ({
      getCoords: () => ({ pipe: () => ({}) })
    });
    const userFacadeServiceStub = () => ({});
    const settingsFacadeServiceStub = () => ({
      getUserSetting: mOBILE_ACCESS_FAVORITES => ({ pipe: () => ({}) })
    });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MobileAccessService,
        { provide: CoordsService, useFactory: coordsServiceStub },
        { provide: UserFacadeService, useFactory: userFacadeServiceStub },
        {
          provide: SettingsFacadeService,
          useFactory: settingsFacadeServiceStub
        }
      ]
    });
    service = TestBed.inject(MobileAccessService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('getLocations', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getMobileLocations').and.callThrough();
      spyOn(component, 'getFavouritesLocations').and.callThrough();
      service.getLocations();
      expect(service.getMobileLocations).toHaveBeenCalled();
      expect(service.getFavouritesLocations).toHaveBeenCalled();
    });
  });

  describe('getMobileLocations', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      const coordsServiceStub: CoordsService = TestBed.inject(CoordsService);
      spyOn(coordsServiceStub, 'getCoords').and.callThrough();
      service.getMobileLocations().subscribe(res => {
        expect(res).toEqual([]);
      });
      const req = httpTestingController.expectOne('/json/commerce');
      expect(req.request.method).toEqual('POST');
      expect(coordsServiceStub.getCoords).toHaveBeenCalled();
      req.flush([]);
      httpTestingController.verify();
    });
  });

  describe('getFavouritesLocations', () => {
    it('makes expected calls', () => {
      const settingsFacadeServiceStub: SettingsFacadeService = TestBed.inject(
        SettingsFacadeService
      );
      spyOn(settingsFacadeServiceStub, 'getUserSetting').and.callThrough();
      service.getFavouritesLocations();
      expect(settingsFacadeServiceStub.getUserSetting).toHaveBeenCalled();
    });
  });
});
