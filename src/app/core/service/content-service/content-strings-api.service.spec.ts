import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { ContentStringRequest } from '../../model/content/content-string-request.model';
import { ContentStringsApiService } from './content-strings-api.service';

describe('ContentStringsApiService', () => {
  let service: ContentStringsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContentStringsApiService]
    });
    service = TestBed.inject(ContentStringsApiService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('retrieveContentStringListByRequest', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      const contentStringRequestStub: ContentStringRequest = <any>{};
      service
        .retrieveContentStringListByRequest(contentStringRequestStub)
        .subscribe(res => {
          expect(res).toEqual(contentStringRequestStub);
        });
      const req = httpTestingController.expectOne('/json/content');
      expect(req.request.method).toEqual('POST');
      req.flush(contentStringRequestStub);
      httpTestingController.verify();
    });
  });
});
