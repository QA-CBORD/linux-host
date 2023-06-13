import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { FavoriteMerchantsService } from './favorite-merchants.service';

describe('FavoriteMerchantsService', () => {
  let service: FavoriteMerchantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FavoriteMerchantsService]
    });
    service = TestBed.inject(FavoriteMerchantsService);
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
