import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CoordsService } from '@core/service/coords/coords.service';
import { MerchantApiService } from './merchant-api.service';
import { simpleServiceApiToAssert } from 'src/app/testing/helpers/api-helpers';
import { of } from 'rxjs';

describe('MerchantApiService', () => {
  let service: MerchantApiService;
  let httpTestingController: HttpTestingController;
  const serviceUrl = '/json/merchant';
  let serviceAssert: (
    method: keyof MerchantApiService,
    params?: any[],
    serviceURL?: string,
    httpMethod?: string,
    response?: any
  ) => void;
  const coordsServiceStub = {
    getCoords: jest.fn().mockReturnValue(of({})),
    latitude: {},
    longitude: {},
  };
  const geoData = { coords: { latitude: 0, longitude: 0 } };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MerchantApiService, { provide: CoordsService, useValue: coordsServiceStub }],
    });
    service = TestBed.inject(MerchantApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
    serviceAssert = simpleServiceApiToAssert(httpTestingController, service);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('getFavoriteMerchants', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.getFavoriteMerchants().subscribe(res => {
        expect(res).toEqual([]);
      });
      const req = httpTestingController.expectOne('/json/merchant');
      expect(req.request.method).toEqual('POST');
      req.flush({ response: { list: [] } });
      httpTestingController.verify();
    });
  });

  it('makes getMerchants calls', () => {
    coordsServiceStub.getCoords.mockReturnValueOnce(of(geoData));
    serviceAssert('getMerchants', [{ addSearchOption: jest.fn() }], serviceUrl, 'POST', { response: { list: [] } });
  });

  it('makes getMenuMerchants calls', () => {
    coordsServiceStub.getCoords.mockReturnValueOnce(of(geoData));
    serviceAssert('getMenuMerchants', [{ addSearchOption: jest.fn() }], serviceUrl);
  });

  it('makes addFavoriteMerchant calls', () => {
    serviceAssert('addFavoriteMerchant', [{}], serviceUrl);
  });

  it('makes removeFavoriteMerchant calls', () => {
    serviceAssert('removeFavoriteMerchant', [{}], serviceUrl);
  });
});
