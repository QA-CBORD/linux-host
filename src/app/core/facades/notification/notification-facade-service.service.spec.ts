import { TestBed } from '@angular/core/testing';

import { NotificationFacadeService } from './notification-facade.service';

describe('NotificationFacadeServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificationFacadeService = TestBed.get(NotificationFacadeService);
    expect(service).toBeTruthy();
  });
});
