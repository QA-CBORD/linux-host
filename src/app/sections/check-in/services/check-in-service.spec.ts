import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { CheckingService } from './check-in-service';

describe('CheckingService', () => {
  let service: CheckingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CheckingService]
    });
    service = TestBed.inject(CheckingService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
