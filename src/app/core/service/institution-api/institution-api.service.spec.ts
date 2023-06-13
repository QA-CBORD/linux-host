import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { InstitutionApiService } from './institution-api.service';

describe('InstitutionApiService', () => {
  let service: InstitutionApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InstitutionApiService]
    });
    service = TestBed.inject(InstitutionApiService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('getInstitutionData', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.getInstitutionData().subscribe(res => {
        expect(res).toEqual();
      });
      const req = httpTestingController.expectOne('/json/institution');
      expect(req.request.method).toEqual('POST');
      req.flush();
      httpTestingController.verify();
    });
  });
});
