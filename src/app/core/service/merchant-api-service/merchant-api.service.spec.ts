import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { MerchantSearchOptions } from '@sections/ordering';
import { CoordsService } from '@core/service/coords/coords.service';
import { MerchantApiService } from './merchant-api.service';

describe('MerchantApiService', () => {
  let service: MerchantApiService;

  beforeEach(() => {
    const coordsServiceStub = () => ({
      getCoords: () => ({ pipe: () => ({}) }),
      latitude: {},
      longitude: {}
    });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MerchantApiService,
        { provide: CoordsService, useFactory: coordsServiceStub }
      ]
    });
    service = TestBed.inject(MerchantApiService);
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
      req.flush([]);
      httpTestingController.verify();
    });
  });
});
