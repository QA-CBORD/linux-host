import { TestBed } from '@angular/core/testing';

import { OrderingApiService } from './ordering.api.service'

describe('OrderingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderingApiService = TestBed.get(OrderingApiService);
    expect(service).toBeTruthy();
  });
});
