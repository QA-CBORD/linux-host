import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { CoordsService } from '@core/service/coords/coords.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { ToastService } from '@core/service/toast/toast.service';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { MobileAccessService } from './mobile-access.service';

describe('MobileAccessService', () => {
  let service: MobileAccessService;

  beforeEach(() => {
    const coordsServiceStub = () => ({
      getCoords: () => ({ pipe: () => ({}) })
    });
    const settingsFacadeServiceStub = () => ({
      getSetting: mOBILE_HEADER_COLOR => ({ pipe: () => ({}) }),
      getUserSetting: mOBILE_ACCESS_FAVORITES => ({ pipe: () => ({}) }),
      saveUserSetting: (mOBILE_ACCESS_FAVORITES, favouritesAsString) => ({
        pipe: () => ({})
      })
    });
    const toastServiceStub = () => ({ showToast: object => ({}) });
    const contentStringsFacadeServiceStub = () => ({
      retrieveContentStringListByRequest: mobileAccessContentStringsParams => ({
        pipe: () => ({})
      })
    });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MobileAccessService,
        { provide: CoordsService, useFactory: coordsServiceStub },
        {
          provide: SettingsFacadeService,
          useFactory: settingsFacadeServiceStub
        },
        { provide: ToastService, useFactory: toastServiceStub },
        {
          provide: ContentStringsFacadeService,
          useFactory: contentStringsFacadeServiceStub
        }
      ]
    });
    service = TestBed.inject(MobileAccessService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('getInstitutionColor', () => {
    it('makes expected calls', () => {
      const settingsFacadeServiceStub: SettingsFacadeService = TestBed.inject(
        SettingsFacadeService
      );
     jest.spyOn(settingsFacadeServiceStub, 'getSetting');
      service.getInstitutionColor();
      expect(settingsFacadeServiceStub.getSetting).toHaveBeenCalled();
    });
  });

  describe('initContentStringsList', () => {
    it('makes expected calls', () => {
      const contentStringsFacadeServiceStub: ContentStringsFacadeService = TestBed.inject(
        ContentStringsFacadeService
      );
     jest.spyOn(
        contentStringsFacadeServiceStub,
        'retrieveContentStringListByRequest'
      );
      service.initContentStringsList();
      expect(
        contentStringsFacadeServiceStub.retrieveContentStringListByRequest
      ).toHaveBeenCalled();
    });
  });

  describe('initContentStringsListgfas', () => {
    it('makes expected calls', () => {
      const contentStringsFacadeServiceStub: ContentStringsFacadeService = TestBed.inject(
        ContentStringsFacadeService
      );
     jest.spyOn(
        contentStringsFacadeServiceStub,
        'retrieveContentStringListByRequest'
      );
      service.initContentStringsListgfas();
      expect(
        contentStringsFacadeServiceStub.retrieveContentStringListByRequest
      ).toHaveBeenCalled();
    });
  });

  describe('getMobileLocations', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      const coordsServiceStub: CoordsService = TestBed.inject(CoordsService);
     jest.spyOn(coordsServiceStub, 'getCoords');
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

  describe('getLocations', () => {
    it('makes expected calls', () => {
     jest.spyOn(service, 'getMobileLocations');
     jest.spyOn(service, 'getFavouritesLocations');
      service.getLocations();
      expect(service.getMobileLocations).toHaveBeenCalled();
      expect(service.getFavouritesLocations).toHaveBeenCalled();
    });
  });

  describe('getFavouritesLocations', () => {
    it('makes expected calls', () => {
      const settingsFacadeServiceStub: SettingsFacadeService = TestBed.inject(
        SettingsFacadeService
      );
     jest.spyOn(settingsFacadeServiceStub, 'getUserSetting');
      service.getFavouritesLocations();
      expect(settingsFacadeServiceStub.getUserSetting).toHaveBeenCalled();
    });
  });
});
