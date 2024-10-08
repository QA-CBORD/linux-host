import { TestBed } from '@angular/core/testing';

import { LogoutService } from './logout.service';
import { CartService } from '@sections/ordering';
import { SessionFacadeService } from '../session/session.facade.service';

describe('LogoutService', () => {
  let service: LogoutService;

  let sessionFacadeService = {
    logoutUser: jest.fn(),
  };

  let cartService = {
    clearCart: jest.fn(),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: SessionFacadeService, useValue: sessionFacadeService },
        { provide: CartService, useValue: cartService },
      ],
    });
    service = TestBed.inject(LogoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
